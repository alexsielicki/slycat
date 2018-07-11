import React, { Component } from 'react';
import URI from 'urijs';
import './namespaced-bootstrap.min.css';
import './styles.css';

class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {credentials:
                {username: '',
                 password: ''
        }};
        this.changeUsername = this.changeUsername.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.b64EncodeUnicode = this.b64EncodeUnicode.bind(this);
    }

    changeUsername(event) {
        const credentials = this.state.credentials;
        credentials.username = event.target.value;
        this.setState({credentials: credentials});
    }

    changePassword(event) {
        const credentials = this.state.credentials;
        credentials.password = event.target.value;
        this.setState({credentials: credentials});
    }

    b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}

    handleSubmit(event) {
        console.log('Username: ' + this.state.credentials.username);
        console.log('Password: ' + this.state.credentials.password);

        var user_name = this.b64EncodeUnicode(this.state.credentials.username);
        var password = this.b64EncodeUnicode(this.state.credentials.password);

        var url = URI("/" + "login");
        var sendInfo = JSON.stringify({
            "user_name": user_name,
            "password": password,
            "location": window.location
        });

        fetch(url, {
            credentials: 'same-origin',
            method: 'POST',
            body: sendInfo,
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => window.location.replace(response.target));

        // $.ajax(
        //     {
        //           contentType: "application/json",
        //           type: "POST",
        //           url: URI("/" + "login"),
        //           data: this.state.credentials.username,//json payload
        //           success: function(result)
        //           {
        //             console.log("success " + result);
        //             //window.location.replace("/");
        //             // window.location.replace(result.target);
        //           },
        //           error: function(request, status, reason_phrase)
        //           {
        //             console.log("error request:" + request.responseJSON +" status: "+ status + " reason: " + reason_phrase);
        //             // $("#signin-alert").show(200);
        //           }
        //     });

        event.preventDefault();
    }

    render() {
        return (
            <form className="form-signin" onSubmit={this.handleSubmit}>
                <label for="username" className="sr-only"></label>
                <input id="username" className="form-control" placeholder="Username" type="text" value={this.state.credentials.username} onChange={this.changeUsername} />

                <label for="password" className="sr-only"></label>
                <input id="password" className="form-control" placeholder="Password" type="text" value={this.state.credentials.password} onChange={this.changePassword} />

                <button className="btn btn-lg btn-primary btn-block" id="go" type="submit">Sign In </button>
            </form>

        );
    }
}

export default Form;