import React from "react";
import { Link } from "react-router-dom";
import { uid } from 'react-uid';

const itemTemplate = (data, icon) => <li key={uid(data)} className="list-group-item"><div className="btn btn-primary btn-sm mr-3"><i className={"fa fa-" + icon}></i></div> {data}</li>;

const ResumeCard = ({ resume, remove }) => {
    const education = resume.education ? itemTemplate(resume.education, 'university') : null;
    const employment = resume.employment ? itemTemplate(resume.employment, 'building') : null;
    const experience = resume.experience ? itemTemplate(resume.experience, 'briefcase') : null;
    const salary = resume.salary ? itemTemplate(resume.salary, 'credit-card') : null;
    const schedule = resume.schedule ? itemTemplate(resume.schedule, 'clock-o') : null;
    const direction = resume.direction ? itemTemplate(resume.direction, 'address-card-o') : null;

    return (
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4" key={resume.id}>
            <div className="image-flip">
                <div className="mainflip flip-0">
                    <div className="frontside">
                        <div className="card">
                            <div className="card-body text-center">
                                <h4 className="card-title">{resume.name}</h4>
                                <p className="card-text">{resume.qualification}.</p>

                                <ul className="list-group list-group-flush text-left">
                                    {direction}
                                    {education}
                                    {employment}
                                    {experience}
                                    {salary}
                                    {schedule}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="backside">
                        <div className="card">
                            <div className="card-body text-center mt-4">
                                <h4 className="card-title">{resume.name}</h4>
                                <div dangerouslySetInnerHTML={{__html: resume.about}} />
                                <p>
                                {
                                    resume.skills.map(skill => {
                                        return <span className="badge btn-primary mr-1" key={skill.id}>{skill.name}</span>
                                    })
                                }
                                </p>

                                <div className="btn-group" role="group">
                                    <Link to={`/resume/update/${resume.id}/`} className="btn btn-primary btn-sm"><i className="fa fa-pencil"></i> Редактировать</Link>
                                    <button onClick={() => remove(resume.id)} className="btn btn-danger btn-sm"><i className="fa fa-pencil"></i> Удалить</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResumeCard;