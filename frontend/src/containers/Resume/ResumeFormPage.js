import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router";

import { createResume, updateResume, getResume } from "../../actions/resumeAction";
import { getDictionaryData } from "../../actions/dictAction";
import { getCurrentUser } from "../../utils/storages";

import { ResumeForm } from "../../components/resume";
import {isEmpty} from "../../utils/common";

class ResumeFormPage extends Component {
    state = {
        currentUser: getCurrentUser(),
        create: true
    }

    componentDidMount() {
        const { match: { params } } = this.props;

        if (params.id) {
            this.setState({
                create: false
            });
            this.props.getResume(params.id)
        }

        this.props.getDictionaryData('employment');
        this.props.getDictionaryData('schedule');
        this.props.getDictionaryData('salary');
        this.props.getDictionaryData('scope');
        this.props.getDictionaryData('experience');
        this.props.getDictionaryData('education');
        this.props.getDictionaryData('direction');
    }

    static getDerivedStateFromProps(props, state) {
        if (props.employment !== null && props.employment) {
            return {
                employment: props.employment
            };
        }

        if (props.schedule !== null && props.schedule) {
            return {
                schedule: props.schedule
            };
        }

        if (props.salary !== null && props.salary) {
            return {
                salary: props.salary
            };
        }

        if (props.scope !== null && props.scope) {
            return {
                scope: props.scope
            };
        }

        if (props.experience !== null && props.experience) {
            return {
                experience: props.experience
            };
        }

        if (props.education !== null && props.education) {
            return {
                education: props.education
            };
        }

        if (props.direction !== null && props.direction) {
            return {
                direction: props.direction
            };
        }

        if (props.skills !== null && props.skills) {
            return {
                skills: props.skills
            };
        }

        if (props.item !== null && props.item) {
            return {
                item: props.item
            };
        }
    }

    render() {
        const [{item, createResume, updateResume}, {currentUser, create}] = [this.props, this.state];

        if (isEmpty(currentUser) || !currentUser) {
            return <Redirect to="/" />
        }

        const formTitle = create ? 'Добавление резюме' : 'Обновление резюме';
        const currentForm = create ? <ResumeForm props={this.props} submitForm={createResume} /> :
                                     <ResumeForm props={this.props} resume={item} submitForm={updateResume} isAdd={create}/>;

        return (
            <div>
                <h1>{formTitle}</h1>

                {currentForm}
            </div>
        );
    }

};


const mapStateToProps = ({ resume: { item, isLoading }, dictionary: { employment, schedule, salary, scope, experience, education, direction, skills } }) => {
    return { item, isLoading, employment, schedule, salary, scope, experience, education, direction, skills }
}

const mapDispatchToProps = {
    createResume,
    updateResume,
    getResume,
    getDictionaryData
}

export default connect(mapStateToProps, mapDispatchToProps)(ResumeFormPage);