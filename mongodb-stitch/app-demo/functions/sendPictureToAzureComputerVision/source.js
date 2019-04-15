exports = function(changeEvent) {
  // pre-check: do not run the function on a Delete change event
  console.log(`Checking the operation type... (${changeEvent.operationType})`);
  if (changeEvent.operationType === "delete") {
    console.log('No action needed on Delete.');
    return {};
  }
  
  // pre-check: run only when the image URL was updated
  if (changeEvent.operationType === "update") {
    console.log('Checking the changed fields...');
    const updatedFields = Object.keys(changeEvent.updateDescription.updatedFields);
    const isImageUrl = updatedFields.some(field => field.match(/image_url/) );
    if (!isImageUrl) {
      console.log('Enrichment can only be made when the image url is updated.');
      return {};
    }
  }
  
  // function arguments
  const docId = changeEvent.documentKey._id;
  console.log(`DocumentID=${docId}`);
  console.log(EJSON.stringify(changeEvent.fullDocument));
  const imageUrl = changeEvent.fullDocument.image_url.trim();
  console.log(`ImageUrl=${imageUrl}`);

  // services
  const collection = context.services.get("mongodb-atlas").db("demoStorage").collection("images");
  const http = context.services.get("Azure");

  // collection.findOne({_id: docId})
  //   .then(out => {
  //     console.log(EJSON.stringify(out));
  //   });
  
  // function body: call Azure Computer Vision to retrieve cognitive informations on the image
  return http.post({
      url: `https://${context.values.get("AzureComputerVisionRegionVariable")}.api.cognitive.microsoft.com/vision/v2.0/analyze?visualFeatures=Categories%2CDescription%2CColor&details=&language=en`,
      body: { url: imageUrl },
      headers: {
        "Content-Type": [ "application/json" ],
        "Ocp-Apim-Subscription-Key": [ context.values.get("AzureComputerVisionKeyVariable") ]
      },
      encodeBodyAsJSON: true
    })
    .then(response => {
      // The response body is encoded as raw BSON.Binary. Parse it to JSON.
      const ejson_body = EJSON.parse(response.body.text());
      collection.updateOne({_id: docId}, {$set: {computerVision: ejson_body}});
      return ejson_body;
    });
};
