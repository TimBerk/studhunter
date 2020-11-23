import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getUserData, setUserData } from "../../actions/userAction";
import { getCurrentUser, getToken } from "../../utils/storages";
import { isEmpty, formatDate } from "../../utils/common";
import { Redirect } from "react-router";
import Spinner from "../../components/spinner";
import { ErrorMessage, Field, Form, Formik } from "formik";


class ProfilePage extends Component {
    state = {
        currentUser: getCurrentUser(),
        currentToken: getToken(),
        isLoading: false
    }

    componentDidMount() {
        const {currentToken, currentUser} = this.state;

        if (currentToken !== null && isEmpty(currentUser)) {

            this.props.getUserData();
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.user !== null && props.user !== state.currentUser) {
            return {
                currentUser: props.user
            };
        }

        if (props.isLoading !== state.isLoading) {
            return {
                isLoading: props.isLoading
            };
        }

        return null;
    }

    render() {
        const [{ currentUser, isLoading }, { setUserData }] = [this.state, this.props];

        if (isLoading && currentUser === null) {
            return <Spinner />
        }

        if (isEmpty(currentUser) || !currentUser) {
            return <Redirect to="/" />
        }

        const location = currentUser.profile && currentUser.profile.location ? currentUser.profile.location : 'Нет адреса';

        return (
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex flex-column align-items-center text-center">
                                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin"
                                     className="rounded-circle" width="150"/>
                                <div className="mt-3">
                                    <h4>{currentUser.first_name} {currentUser.last_name}</h4>
                                    <p className="text-secondary mb-1">Full Stack Developer</p>
                                    <p className="text-muted font-size-sm">{location}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card mb-3">
                        <div className="card-body">
                            <h3>Профиль</h3>
                            <Formik
                                initialValues={{
                                    username: currentUser.username ? currentUser.username : '',
                                    password: '',
                                    last_name: currentUser.last_name ? currentUser.last_name : '',
                                    first_name: currentUser.first_name ? currentUser.first_name : '',
                                    email: currentUser.email ? currentUser.email : '',
                                    profile: {
                                        avatar: '',
                                        gender: currentUser.profile && currentUser.profile.gender ? String(currentUser.profile.gender) : '1',
                                        birth_date: currentUser.profile && currentUser.profile.birth_date ? currentUser.profile.birth_date : '',
                                        location: currentUser.profile && currentUser.profile.location ? currentUser.profile.location : '',
                                    },
                                }}
                                validate={values => {
                                    const errors = {};
                                    if (!values.username) {
                                        errors.username = 'Логин обязательное поле';
                                    }
                                    if (!values.password) {
                                        errors.password = 'Пароль обязательное поле';
                                    }
                                    if (!values.profile || !values.profile.gender) {
                                        errors.profile.gender = 'Пол обязательное поле';
                                    }
                                    if (!values.profile || !values.profile.birth_date) {
                                        errors.profile.birth_date = 'Дата рождения обязательное поле';
                                    }
                                    return errors;
                                }}
                                onSubmit={(values, {setSubmitting}) => {
                                    let submit_data = values;
                                    let birth_date = formatDate(values.profile.birth_date);
                                    submit_data.profile.birth_date = birth_date;
                                    setUserData(submit_data);
                                }}
                            >
                                {({isSubmitting, errors, values, setFieldValue}) => (
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

                                        <hr/>

                                        <div className="form-group">
                                            <label htmlFor="last_name">Фамилия</label>
                                            <Field
                                                type="text"
                                                name="last_name"
                                                className={"form-control" + (errors.last_name ? ' is-invalid': '')}
                                            />
                                            <ErrorMessage name="last_name" component="div" className="invalid-feedback"/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="first_name">Имя</label>
                                            <Field
                                                type="text"
                                                name="first_name"
                                                className={"form-control" + (errors.first_name ? ' is-invalid': '')}
                                            />
                                            <ErrorMessage name="first_name" component="div" className="invalid-feedback"/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <Field
                                                type="text"
                                                name="email"
                                                className={"form-control" + (errors.email ? ' is-invalid': '')}
                                            />
                                            <ErrorMessage name="email" component="div" className="invalid-feedback"/>
                                        </div>

                                        <hr/>

                                        <div className="form-group">
                                            <label htmlFor={`profile.avatar`}>Аватар</label>

                                            <div className="custom-file">
                                                <input
                                                    type="file"
                                                    className="custom-file-input"
                                                    name={`profile.avatar`}
                                                    onChange={(event) => {
                                                      setFieldValue("file", event.currentTarget.files[0]);
                                                    }}
                                                />
                                                <label className="custom-file-label" htmlFor="customFile">Выбирите файл</label>
                                            </div>

                                            <ErrorMessage name={`profile.avatar`} component="div" className="invalid-feedback"/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor={`profile.gender`}>Пол</label>

                                            <div className="form-check">
                                                 <Field
                                                    type="radio"
                                                    name={`profile.gender`}
                                                    value="1"
                                                    checked={values.profile.gender === '1'}
                                                    className={"form-check-input" + (errors.profile && errors.profile.gender ? ' is-invalid': '')}
                                                />
                                                <label className="form-check-label" htmlFor={`profile.gender`}>
                                                    Мужской
                                                </label>
                                            </div>

                                            <div className="form-check">
                                                 <Field
                                                    type="radio"
                                                    name={`profile.gender`}
                                                    value="2"
                                                    checked={values.profile.gender === '2'}
                                                    className={"form-check-input" + (errors.profile && errors.profile.gender ? ' is-invalid': '')}
                                                />
                                                <label className="form-check-label" htmlFor={`profile.gender`}>
                                                    Женский
                                                </label>
                                            </div>

                                             <ErrorMessage name={`profile.gender`} component="div" className="invalid-feedback"/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor={`profile.birth_date`}>День рождения</label>
                                            <Field
                                                type="date"
                                                name={`profile.birth_date`}
                                                className={"form-control" + (errors.profile && errors.profile.birth_date ? ' is-invalid': '')}
                                            />
                                            <ErrorMessage name={`profile.birth_date`} component="div" className="invalid-feedback"/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor={`profile.location`}>Город</label>
                                            <Field
                                                type="text"
                                                name={`profile.location`}
                                                className={"form-control" + (errors.profile && errors.profile.location ? ' is-invalid': '')}
                                            />
                                            <ErrorMessage name={`profile.location`} component="div" className="invalid-feedback"/>
                                        </div>

                                        <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                            Сохранить
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = ({auth: {token}, user: {user, isLoading}}) => {
    return {token, user, isLoading}
}

const mapDispatchToProps = {
    getUserData,
    setUserData
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);