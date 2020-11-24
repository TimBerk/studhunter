import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { login } from "../../actions/authAction";
import {getCurrentUser} from "../../utils/storages";
import {Redirect} from "react-router";
import {isEmpty} from "../../utils/common";
import Spinner from "../../components/spinner";

class LoginPage extends Component {
    state = {
        currentUser: getCurrentUser()
    }

    static getDerivedStateFromProps(props, state) {
        if (props.user !== undefined && props.user !== state.currentUser) {
            return {
                currentUser: props.user
            };
        }

        return null;
    }

    render() {
        const [{ login, isLoading }, { currentUser }] = [this.props, this.state];

        if (isLoading) {
            return <Spinner />
        }

        if ((currentUser && !isEmpty(currentUser))) {
            return <Redirect to="/" />
        }

        return (
            <div>
                <h1>Авторизация</h1>
                <Formik
                    initialValues={{ username: '', password: '' }}
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
                        const result = await login(values);
                        if (result.type === 'LOGIN_SUCCESS') {
                            this.props.history.push('/');
                        }
                    }}
                >
                    {({isSubmitting, errors}) => (
                        <Form className="needs-validation">
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

const mapStateToProps = ({ auth: { isLoading } }) => {
    return { isLoading }
}

const mapDispatchToProps = {
    login
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginPage));