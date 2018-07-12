import React from "react";
import ReactDOM from "react-dom";
import client from 'js/slycat-web-client';
import server_root from 'js/slycat-server-root';
import model_names from 'js/slycat-model-names';
import markings from 'js/slycat-markings';
import * as dialog from 'js/slycat-dialog';
import renderTemplates from 'js/slycat-project-main';

class ModelsList extends React.Component {
  render() {
    const models = this.props.models.map((model) =>
    {
      return  (
                <Model 
                  name={model.name} 
                  key={model._id}
                  id={model._id} 
                  description={model.description} 
                  created={model.created}
                  creator={model.creator} 
                  model_type={model['model-type']}
                  marking={model.marking}
                  message={model.message}
                  result={model.result}
                />
              );
    });

    if(models.length > 0)
    {
      return (
        <div className="container">
          <h3>Models</h3>
          <div className="panel panel-default">
            <div className="list-group">
              <React.Fragment>
                {models}
              </React.Fragment>
            </div>
          </div>
        </div>
      );
    }
    else
    {
      return (
        <div className="container">
          <h3>Models</h3>
          <div className="panel panel-default">
            <div className="list-group">
              <div className="list-group-item">There are no models in this project. You can add a model by using the Create menu above.</div>
            </div>
          </div>
        </div>
      );
    }
  }
}

class Model extends React.Component {
  render() {
    let markings_allowed = markings.allowed;
    let badge = function(marking)
    {
      for(var i = 0; i != markings_allowed().length; ++i)
      {
        if(markings_allowed()[i].type() == marking)
          return markings_allowed()[i].badge();
      }
    }

    return (
      <a className="list-group-item" href={server_root + 'models/' + this.props.id}>
        <span className="label label-default">{model_names.translate_model_type(this.props.model_type) + ' model'}</span>
        &nbsp;
        <strong>{this.props.name} </strong>
        {/* badge() function returns HTML, which React escapes, so we need to use
            dangerouslySetInnerHTML per https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml */}
        <div className="pull-right" style={{display: 'inline-block'}} dangerouslySetInnerHTML={{__html: badge(this.props.marking)}}></div>
        {this.props.result == 'failed' &&
        <span className="label label-danger" title={this.props.message}>Failed</span>
        }
        <p>
          <small>
            <span>{this.props.description}</span>
            <em>
              Created <span>{this.props.created}</span> by <span>{this.props.creator}</span>
            </em>
          </small>
        </p>
      </a>
    );
  }
}

class TemplatesList extends React.Component {
  render() {
    const templates = this.props.templates
    .filter(function(reference)
    {
      return reference.bid && !reference.mid;
    })
    .map((reference) =>
    {
      return  (
                <Template 
                  name={reference.name} 
                  key={reference._id}
                  id={reference._id} 
                  created={reference.created}
                  creator={reference.creator} 
                  model_type={reference['model-type']}
                  project={reference.project}
                />
              );
    });

    if(templates.length > 0)
    {
      return (
        <div className="container">
          <h3>Templates</h3>
          <div className="panel panel-default">
            <div className="list-group">
              <React.Fragment>
                {templates}
              </React.Fragment>
            </div>
          </div>
        </div>
      );
    }
    else
    {
      return null;
    }
  }
}

class Template extends React.Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.delete_template = this.delete_template.bind(this);
  }

  delete_template(e) {
    const template_id = this.props.id;
    const project_id = this.props.project;
    dialog.dialog(
    {
      title: "Delete Template?",
      message: 'The template "' + this.props.name + '" will be deleted immediately and there is no undo.  This will not affect any existing models.',
      buttons: [{className: "btn-default", label:"Cancel"}, {className: "btn-danger",label:"OK"}],
      callback: function(button)
      {
        if(button.label != "OK")
          return;
        client.delete_reference(
        {
          rid: template_id,
          success: function()
          {
            renderTemplates(project_id);
          },
          error: dialog.ajax_error("Couldn't delete template."),
        });
      },
    });
  }

  render() {
    return (
      <div className="list-group-item">
        <span className="label label-default">{model_names.translate_model_type(this.props.model_type) + ' model'}</span>
        &nbsp;
        <strong>{this.props.name} </strong>
        <small>
          <em>
            Created <span>{this.props.created}</span> by <span>{this.props.creator}</span>
          </em>
        </small>
        <span className="pull-right">
          {/* <button type="button" class="btn btn-xs btn-warning" data-bind="click: $parent.edit_template"><span class="fa fa-pencil"></span></button> */}
          <button type="button" className="btn btn-xs btn-danger" name={this.props.id} onClick={this.delete_template} title="Delete this template"><span className="fa fa-trash-o"></span></button>
        </span>
      </div>
    );
  }
}

export { ModelsList, TemplatesList };