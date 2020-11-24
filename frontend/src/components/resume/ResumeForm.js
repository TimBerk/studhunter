import React, {useEffect} from "react";
import { withRouter } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Select from "react-select";
import AsyncSelect from "react-select/async/dist/react-select.esm";
import { searchDictionaryData } from "../../utils/requests";
import { qualificationValues } from "../../constants/QualificationValues"
import Spinner from "../spinner";

const ResumeForm = ({props, submitForm, resume = {}, isAdd=true}) => {
    if (resume == null) {
        return <Spinner />
    }

    const currentSkills = resume && resume.skills ? resume.skills.map(item => ({"value": item.id, "label": item.name})) : [] ;
    const btnText = isAdd ? 'Добавить резюме' : 'Обновить резюме';
    const initialValues = {
        name: '',
        about: '',
        employment: '',
        schedule: '',
        salary: '',
        scope: '',
        qualification: '',
        experience: '',
        direction: '',
        education: '',
        skills: [],
    }

    function onSubmit (values, { setSubmitting }) {
        setSubmitting(false);

        if (isAdd) {
            submitForm(values);
        } else {
            submitForm(resume.id, values);
        }

        props.history.push('/resume');
    }

    return (
        <Formik
            initialValues={initialValues}
            validate={values => {
                const errors = {};
                if (!values.name) {
                    errors.name = 'Название обязательное поле';
                }
                if (!values.about) {
                    errors.about = 'Описание обязательное поле';
                }

                return errors;
            }}
            onSubmit={onSubmit}
        >
           {({ isSubmitting, errors, values, setFieldValue}) => {
               // eslint-disable-next-line react-hooks/rules-of-hooks
                useEffect(() => {
                    if (resume.id) {
                        const fields = ['name', 'about', 'employment', 'schedule', 'salary', 'scope', 'qualification', 'experience', 'education', 'direction'];
                        fields.forEach(field => setFieldValue(field, resume[field], false));
                        setFieldValue('skills', currentSkills)
                    }
                }, []);

                return (
                    <Form className="needs-validation" >
                        <div className="form-group">
                            <label htmlFor="name">Название</label>
                            <Field
                                type="text"
                                name="name"
                                className={"form-control" + (errors.name ? ' is-invalid' : '')}
                            />
                            <ErrorMessage name="name" component="div" className="invalid-feedback"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="about">Описание</label>
                            <div className={(errors.about ? 'is-invalid' : '')}>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={resume.about ?? ''}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setFieldValue("about", data);
                                    }}
                                />
                            </div>
                            <ErrorMessage name="about" component="div" className="invalid-feedback"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="employment">Занятость</label>
                            <Select
                                className={(errors.employment ? ' is-invalid' : '')}
                                value={props.employment.filter(option => option.value === values.employment)}
                                defaultValue={values.employment}
                                onChange={(event) => {
                                    setFieldValue("employment", event.value);
                                }}
                                options={props.employment}
                                isMulti={false}
                            />
                            <ErrorMessage name="employment" component="div" className="invalid-feedback"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="qualification">Квалификация</label>
                            <Select
                                className={(errors.qualification ? ' is-invalid' : '')}
                                value={qualificationValues.filter(option => option.value === values.qualification)}
                                defaultValue={values.qualification}
                                onChange={(event) => {
                                    setFieldValue("qualification", event.value);
                                }}
                                options={qualificationValues}
                                isMulti={false}
                            />
                            <ErrorMessage name="qualification" component="div" className="invalid-feedback"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="schedule">Время работы</label>
                            <Select
                                className={(errors.schedule ? ' is-invalid' : '')}
                                value={props.schedule.filter(option => option.value === values.schedule)}
                                defaultValue={values.schedule}
                                onChange={(event) => {
                                    setFieldValue("schedule", event.value);
                                }}
                                options={props.schedule}
                                isMulti={false}
                            />
                            <ErrorMessage name="schedule" component="div" className="invalid-feedback"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="salary">Заработная плата</label>
                            <Select
                                className={(errors.salary ? ' is-invalid' : '')}
                                value={props.salary.filter(option => option.value === values.salary)}
                                defaultValue={values.schedule}
                                onChange={(event) => {
                                    setFieldValue("salary", event.value);
                                }}
                                options={props.salary}
                                isMulti={false}
                            />
                            <ErrorMessage name="scope" component="div" className="invalid-feedback"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="scope">Область деятельности</label>
                            <Select
                                className={(errors.scope ? ' is-invalid' : '')}
                                value={props.scope.filter(option => option.value === values.scope)}
                                defaultValue={values.scope}
                                onChange={(event) => {
                                    setFieldValue("scope", event.value);
                                }}
                                options={props.scope}
                                isMulti={false}
                            />
                            <ErrorMessage name="scope" component="div" className="invalid-feedback"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="experience">Опыт работы</label>
                            <Select
                                className={(errors.experience ? ' is-invalid' : '')}
                                value={props.experience.filter(option => option.value === values.experience)}
                                defaultValue={values.experience}
                                onChange={(event) => {
                                    setFieldValue("experience", event.value);
                                }}
                                options={props.experience}
                                isMulti={false}
                            />
                            <ErrorMessage name="experience" component="div" className="invalid-feedback"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="education">Образование</label>
                            <Select
                                className={(errors.education ? ' is-invalid' : '')}
                                value={props.education.filter(option => option.value === values.education)}
                                defaultValue={values.education}
                                onChange={(event) => {
                                    setFieldValue("education", event.value);
                                }}
                                options={props.education}
                                isMulti={false}
                            />
                            <ErrorMessage name="education" component="div" className="invalid-feedback"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="direction">Направление подготовки</label>
                            <Select
                                className={(errors.direction ? ' is-invalid' : '')}
                                value={props.direction.filter(option => option.value === values.direction)}
                                defaultValue={values.direction}
                                onChange={(event) => {
                                    setFieldValue("direction", event.value);
                                }}
                                options={props.direction}
                                isMulti={false}
                            />
                            <ErrorMessage name="direction" component="div" className="invalid-feedback"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="skills">Навыки</label>
                            <AsyncSelect
                                className={(errors.skills ? ' is-invalid' : '')}
                                value={values.skills || ""}
                                loadOptions={e => searchDictionaryData('skills', e)}
                                onChange={(event) => {
                                    if (event) {
                                        setFieldValue("skills", event);
                                    }
                                }}
                                options={props.skills}
                                isMulti={true}
                            />
                            <ErrorMessage name="skills" component="div" className="invalid-feedback"/>
                        </div>


                        <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            {btnText}
                        </button>
                    </Form>
                )
            }}
        </Formik>
    );
}

export default withRouter(ResumeForm);