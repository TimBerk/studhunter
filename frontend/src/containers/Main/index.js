import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVacancyList } from "../../actions/vacancyAction";
import { getCurrentUser } from "../../utils/storages";
import { VacancyCard } from "../../components/vacancy";


class MainPage extends Component {
    state = {
        currentUser: getCurrentUser()
    }

    componentDidMount() {
        if (this.state.currentUser) {
            this.props.getVacancyList();
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
        const [{ list }] = [this.props, this.state];


        return (

            <section id="resume-list" className="pb-5">
                <div className="container">
                    <h5 className="section-title h1">Вакансии</h5>
                    <div className="row">
                        {
                            list.map(vacancy => {
                                return (
                                   <VacancyCard vacancy={vacancy} key={vacancy.id}/>
                                );
                            })
                        }
                    </div>
                </div>
            </section>
        );
    }

};


const mapStateToProps = ({ vacancy: { list, isLoading } }) => {
    return { list, isLoading }
}

const mapDispatchToProps = {
    getVacancyList
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);