import React from "react";
import { Link } from "react-router-dom";

const itemTemplate = (data, icon) => <li className="list-group-item"><div className="btn btn-primary btn-sm mr-3"><i className={"fa fa-" + icon}></i></div> {data}</li>;

const VacancyCard = ({ vacancy }) => {

    const education = vacancy.education ? itemTemplate(vacancy.education, 'university') : null;
    const employment = vacancy.employment ? itemTemplate(vacancy.employment, 'building') : null;
    const experience = vacancy.experience ? itemTemplate(vacancy.experience, 'briefcase') : null;
    const salary = vacancy.salary ? itemTemplate(vacancy.salary, 'credit-card') : null;
    const schedule = vacancy.schedule ? itemTemplate(vacancy.schedule, 'clock-o') : null;

    const description = vacancy.description.substring(0, 200) + '...';

    return (
        <div className="col-12" key={vacancy.id}>
            <div className="image-flip">
                <div className="mainflip flip-0">
                    <div className="frontside">
                        <div className="card">
                            <div className="card-body text-center">
                                <h4 className="card-title">{vacancy.name}</h4>
                                <p className="card-text">{vacancy.qualification}.</p>

                                <ul className="list-group list-group-flush text-left">
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
                                <h4 className="card-title">{vacancy.name}</h4>
                                <div className="text-justify" dangerouslySetInnerHTML={{__html: description}} />
                                <p>
                                {
                                    vacancy.skills.map(skill => {
                                        return <span className="badge btn-primary mr-1" key={skill.id}>{skill.name}</span>
                                    })
                                }
                                </p>

                                <div className="btn-group" role="group">
                                    <Link to={`/vacancy/${vacancy.id}/`} className="btn btn-primary btn-sm"><i className="fa fa-eye"></i> Посмотреть</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VacancyCard;