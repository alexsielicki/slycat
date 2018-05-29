import React from "react";

class ControlsDropdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let optionItems = this.props.items.map((item) =>
      <li role='presentation' key={item.key} className={item.key == this.props.selected ? 'active' : ''}>
        <a role="menuitem" tabIndex="-1" onClick={(e) => this.props.set_selected(this.props.state_label, item.key, this.props.trigger, e)}>
          {item.name}
        </a>
      </li>);
    return (
      <React.Fragment>
      <div className="btn-group btn-group-xs">
        <button className="btn btn-default dropdown-toggle" type="button" id={this.props.id} data-toggle="dropdown" aria-expanded="true" title={this.props.title}>
          {this.props.label}&nbsp;
          <span className="caret"></span>
        </button>
        <ul className="dropdown-menu" role="menu" aria-labelledby={this.props.id}>
          {optionItems}
        </ul>
      </div>
      </React.Fragment>
    );
  }
}

export default ControlsDropdown