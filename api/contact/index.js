const { BlobServiceClient } = require('@azure/storage-blob');
const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient('uploads');

module.exports = async function (context, req) {
  const form = req.parseFormBody();

  // access form data (string)
  const name = form.get('name')?.value?.toString();
  const email = form.get('email')?.value?.toString();
  context.res.body = {
    name,
    email,
  };

  // access file upload (buffer)
  const file = form.get('file');
  if (file) {
    const blockBlobClient = containerClient.getBlockBlobClient(file.fileName);
    await blockBlobClient.upload(file.value, file.value.length);
  }
};