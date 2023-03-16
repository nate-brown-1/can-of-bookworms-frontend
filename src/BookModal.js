import React from 'react';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

class BookModal extends React.Component {

  render() {

    return (

    <>  
      <Modal className="bookModal"
        show={this.props.show}
        onHide={this.props.onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title>Feed the Bookworms!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.props.handleFormSubmit}>
            <Form.Label>Book Title
              <Form.Control type="text" name="title" />
            </Form.Label>
            <Form.Label>Book Status
              <Form.Select name="status">
                <option value="Untouched">Untouched</option>
                <option value="Chewed">Chewed</option>
                <option value="Swallowed">Swallowed</option>
              </Form.Select>
            </Form.Label>
            <Form.Label>Book description
              <Form.Control type="text" name="description" />
            </Form.Label>
            <Button type="submit">Feed</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bookModalFooter">
          The bookworms are always hungry...
        </Modal.Footer>
      </Modal>
    </>
    )
  }
}

export default BookModal;