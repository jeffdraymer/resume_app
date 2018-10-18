import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; 


class ProfileGithub extends Component {
    constructor(props){
        super(props);
        this.state = {
            //Github api will only be accessed from this component so no need to setup redux
            clientId: '15f8267482f607daeda2',
            clientSecret: '5f54bd7be72e1c37c81ebf5e9500db57a841f287',
            count: 5,
            sort: 'created: asc',
            repos: [] //Will hold the details of the repos with the user is currently added to
        }
    }

    componentDidMount(){
        const { username } = this.props;
        const { count, sort, clientId, clientSecret } = this.state;

        //using fetch request instead of axios, again due to not using redux
        fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
        .then(res => res.json()) // need to map response to json with fetch request
        .then(data => {
            if(this.refs.myRef){
                this.setState({ repos: data })
            }            
        })
        .catch(err => console.log(err));
    }

    render() {
        const { repos } = this.state;
        
        //Loop through all available Github repo details for provided username and display
        const repoItems = repos.map(repo => (
            <div key={repo.id} className="card card-body mb-2">
                <div className="row">
                    <div className="col-md-6">
                        <h4>
                            <Link to={repo.html_url} className="text-info" target="_blank">
                            {repo.name}
                            </Link>
                        </h4>
                        <p>{repo.description}</p>
                    </div>
                    <div className="col-md-6">
                        <span className="badge badge-info mr-1">
                            Stars: {repo.stargazers_count}
                        </span>
                        <span className="badge badge-secondary mr-1">
                            Watchers: {repo.watchers_count}
                        </span>
                        <span className="badge badge-success">
                            Forks: {repo.forks_count}
                        </span>
                    </div>
                </div>
            </div>
        ));

        return (
            <div ref="myRef">
                <hr/>
                <h3 className="mb-4">Latest Github Repos</h3>
                {repoItems}
            </div>
        )
    }
}

ProfileGithub.Proptypes = {
    username: PropTypes.string.isRequired
}
export default ProfileGithub;