import React, { Component } from 'react';
import { Link } from 'react-router-dom'; //navigate in app
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createPosts } from '../actions';


class PostsNew extends Component {
  renderField(field) {
    const { meta: { touched, error} } = field; // shorter than const meta = field.meta and const touched = field.meta.touched...
    const classNames= `form-group ${touched && error ? 'has-danger' : ''} `
    return(
      <div className={classNames}>
        <label>{field.label}</label>
        <input
          className='form-control'
          type='text'
          {...field.input} // form makes onChange = {field.input.onChange},... not necessary
        />
        <div className='text-help'>
          {touched ? error : ''}
        </div>
      </div>
    )
  }
  onSubmit = (values) => {
    this.props.createPosts(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props; // const handleSubmit = this.props.handleSubmit (dan kan dit voor andere dingen ook)
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field label='Title' name='title' component={this.renderField} />
          <Field label='Categories' name='categories' component={this.renderField} />
          <Field label='Post content' name='content' component={this.renderField} />
          <button type='submit' className='btn btn-primary'>Submit</button>
          <Link className='btn btn-danger' style={{marginLeft: '5px'}} to='/'>Cancel</Link>
        </form>
      </div>

    )
  }
}

function validate(values) { //validate function will automatically be called by redux-form
  const errors = {};
  // validate input (values)
  if(!values.title || values.title.length < 3) {
    errors.title = 'Enter a title that is at least 3 characters!'; //looks at name='title'
  }
  if(!values.categories) {
    errors.categories = 'Enter some catagories!';
  }
  if(!values.content) {
    errors.content = 'Enter some content please!';
  }
  // if errors is empty, form is fine to submit
  // if errors not empty: form is invalid
  return errors;
}

export default reduxForm({
  validate, //validate: validate is same, this is shorter
  form: 'PostsNewForm'
})(
  connect(null, { createPosts }) (PostsNew) //combine reduxForm and connect
);
