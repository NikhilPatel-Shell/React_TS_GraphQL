import { gql, useMutation } from '@apollo/client';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useHistory } from 'react-router';
import { Col, Form, Label, Row } from 'reactstrap';
import { useFileUploadMutation } from '../../generated/graphql';

// const uploadFileMut = gql`
//   mutation FileUpload($file: Upload!){
//     singleFileUpload(file: $file) {
//       filename
//     }
// }
// `;


const Invoice = () => {
  const history = useHistory();
  const [uploadFile, { loading }] = useFileUploadMutation({
    onError: (e) => console.log(e),
    onCompleted: () => history.push('/customers')
  });

  const onDrop = useCallback(
    ([file]) => {
      uploadFile({ variables: { file } });
    },
    [uploadFile]
  )


  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <>
      <div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Invoice Page</h1>
      </div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Upload Invoice</h1>
      </div>
      <Form>
        <Row>
          <Col md={6}>
            <Label for="contact_email">File Upload</Label>
            <div className="mb-4">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {
                  loading ?
                    <p>Uploading ...</p> :
                    isDragActive ?
                      <p>Drop the files here ...</p> :
                      <p>Drag 'n' drop some files here, or click to select files</p>
                }
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Invoice;