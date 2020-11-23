import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Button, Input,
} from 'antd';

const ContactsInfoForm = ({ onSubmit, initialValues }) => (
  <Form onFinish={onSubmit} initialValues={initialValues}>
    <Form.List name="contactsInfoReleases">
      {
        (fields) => fields.map((field) => (
          <Form.Item
            {...field}
            name={[field.name]}
            fieldKey={[field.fieldKey, 'first']}
          >
            <Input placeholder="Releases contact info" />
          </Form.Item>
        ))
      }
    </Form.List>
    <Form.Item name="releasesContactInfo">
      <Input placeholder="Releases contact info" autoFocus />
    </Form.Item>
    <Button htmlType="submit" type="primary">Add Sponsor</Button>
  </Form>
);

ContactsInfoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    contactsInfoReleases: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default ContactsInfoForm;
