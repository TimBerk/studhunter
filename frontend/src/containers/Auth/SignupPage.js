import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { signup } from "../../actions/authAction";
import {getCurrentUser} from "../../utils/storages";
import {Redirect} from "react-router";
import {isEmpty} from "../../utils/common";

class SignupPage extends Component {
    state = {
        currentUser: getCurrentUser()
    }


    render() {
        const [{ signup }, { currentUser }] = [this.props, this.state];

        if (currentUser && !isEmpty(currentUser)) {
            return <Redirect to="/" />
        }

        return (
            <div>
                <h1>Регистрация</h1>
                <Formik
                    initialValues={{ username: '', password: '', first_name: '', last_name: '', }}
                    validate={values => {
                        const errors = {};
                        if (!values.username) {
                            errors.username = 'Логин обязательное поле';
                        }
                        if (!values.password) {
                            errors.password = 'Пароль обязательное поле';
                        }
                        return errors;
                    }}
                    onSubmit={async (values, {setSubmitting}) => {
                        const result = await signup(values);
                        if (result.type === 'SIGNUP_SUCCESS') {
                            this.props.history.push('/');
                        }
                    }}
                >
                    {({isSubmitting, errors}) => (
                        <Form className="needs-validation">
                            <div className="form-group">
                                <label htmlFor="username">Фамилия</label>
                                <Field
                                    type="text"
                                    name="last_name"
                                    className={"form-control" + (errors.last_name ? ' is-invalid': '')}
                                />
                                <ErrorMessage name="last_name" component="div" className="invalid-feedback"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="username">Имя</label>
                                <Field
                                    type="text"
                                    name="first_name"
                                    className={"form-control" + (errors.first_name ? ' is-invalid': '')}
                                />
                                <ErrorMessage name="first_name" component="div" className="invalid-feedback"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="username">Логин</label>
                                <Field
                                    type="text"
                                    name="username"
                                    className={"form-control" + (errors.username ? ' is-invalid': '')}
                                />
                                <ErrorMessage name="username" component="div" className="invalid-feedback"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Пароль</label>
                                <Field
                                    type="password"
                                    name="password"
                                    className={"form-control" + (errors.password ? ' is-invalid': '')}
                                />
                                <ErrorMessage name="password" component="div" className="invalid-feedback"/>
                            </div>

                            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                Войти
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }

};

const mapStateToProps = ({ auth: { isLoggedIn } }) => {
    return { isLoggedIn }
}

const mapDispatchToProps = {
    signup
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignupPage));