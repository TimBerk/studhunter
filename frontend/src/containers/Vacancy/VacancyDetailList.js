import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVacancy } from "../../actions/vacancyAction";
import { getCurrentUser } from "../../utils/storages";
import { VacancyDetail } from "../../components/vacancy";
import Spinner from "../../components/spinner";


class VacancyDetailList extends Component {
    state = {
        currentUser: getCurrentUser()
    }

    componentDidMount() {
        const { match: { params } } = this.props;

        if (params.id) {
            this.props.getVacancy(params.id)
        }
    }

     static getDerivedStateFromProps(props, state) {
         if (props.item !== null && props.item) {
             return {
                 item: props.item
             };
         }

         if (props.isLoading !== null && props.isLoading) {
             return {
                 isLoading: props.isLoading
             };
         }
     }

    render() {
        const [{ item, isLoading }] = [this.props, this.state];

        if (isLoading || item == null) {
            return <Spinner />
        }

        return (
            <section id="resume-list" className="pb-5">
                <div className="container">
                    <h5 className="section-title h1">Вакансии</h5>
                    <div className="row">
                           <VacancyDetail vacancy={item} key={item.id}/>
                    </div>
                </div>
            </section>
        );
    }
};


const mapStateToProps = ({ vacancy: { item, isLoading } }) => {
    return { item, isLoading }
}

const mapDispatchToProps = {
    getVacancy
}

export default connect(mapStateToProps, mapDispatchToProps)(VacancyDetailList);