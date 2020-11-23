import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getResumeList, deleteResume } from "../../actions/resumeAction";
import { getCurrentUser } from "../../utils/storages";
import { Redirect } from "react-router";
import { isEmpty } from "../../utils/common";
import './style.css';
import {ResumeCard} from "../../components/resume";


class ResumeListPage extends Component {
    state = {
        currentUser: getCurrentUser()
    }

    componentDidMount() {
        if (this.state.currentUser) {
            this.props.getResumeList();
        }
    }

     static getDerivedStateFromProps(props, state) {
         if (props.list !== null && props.list) {
             return {
                 list: props.list
             };
         }
     }

    render() {
        const [{ list, deleteResume }, { currentUser }] = [this.props, this.state];

        if (isEmpty(currentUser) || !currentUser) {
            return <Redirect to="/" />
        }

        return (

            <section id="resume-list" className="pb-5">
                <div className="container">
                    <h5 className="section-title h1">Мои резюме</h5>
                    <div className="row">
                        {
                            list.map(resume => {
                                return (
                                   <ResumeCard resume={resume} key={resume.id} remove={deleteResume}/>
                                );
                            })
                        }
                    </div>
                </div>
            </section>
        );
    }

};


const mapStateToProps = ({ resume: { list, isLoading } }) => {
    return { list, isLoading }
}

const mapDispatchToProps = {
    getResumeList,
    deleteResume
}

export default connect(mapStateToProps, mapDispatchToProps)(ResumeListPage);