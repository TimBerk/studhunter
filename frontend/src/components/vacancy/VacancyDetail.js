import React from "react";
import { Link } from "react-router-dom";

const itemTemplate = (data, icon) => <li className="list-group-item"><div className="btn btn-primary btn-sm mr-3"><i className={"fa fa-" + icon}></i></div> {data}</li>;

const VacancyDetail = ({ vacancy }) => {

    const education = vacancy.education ? itemTemplate(vacancy.education, 'university') : null;
    const employment = vacancy.employment ? itemTemplate(vacancy.employment, 'building') : null;
    const experience = vacancy.experience ? itemTemplate(vacancy.experience, 'briefcase') : null;
    const salary = vacancy.salary ? itemTemplate(vacancy.salary, 'credit-card') : null;
    const schedule = vacancy.schedule ? itemTemplate(vacancy.schedule, 'clock-o') : null;

    const description = vacancy.description;

    return (
        <div className="col-12" key={vacancy.id}>
            <div className="card">
                <div className="card-body text-center">
                    <h4 className="card-title">{vacancy.name}</h4>
                    <p>
                    {
                        vacancy.skills.map(skill => {
                            return <span className="badge btn-primary mr-1" key={skill.id}>{skill.name}</span>
                        })
                    }
                    </p>

                    <div className="text-justify" dangerouslySetInnerHTML={{__html: description}} />

                    <p className="card-text">{vacancy.qualification}.</p>

                    <ul className="list-group list-group-flush text-left">
                        {education}
                        {employment}
                        {experience}
                        {salary}
                        {schedule}
                    </ul>

                    <div className="btn-group" role="group">
                        <Link to="/" className="btn btn-primary btn-sm"><i className="fa fa-eye"></i> Вернуться</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VacancyDetail;