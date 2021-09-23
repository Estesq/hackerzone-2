import React, { Component } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class ChallengeDesc extends Component {
  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="form-group row">
            <div className="col-md-3">
              <label htmlFor="name">Name</label>
            </div>
            <div className="col-md-9">
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={this.props.handleInputProp}
                id="name"
                placeholder=""
                value={this.props.stateValues.name}
              />
            </div>
          </div>
          <div className="form-group row" style={{ minHeight: "30vh" }}>
            <div className="col-md-3">
              <label htmlFor="description">Description</label>
            </div>
            <div className="col-md-9">
              <CKEditor
                editor={ClassicEditor}
                onReady={editor => {
                  console.log('Editor is ready to use!', editor);
                }}
                style={{ height: "100%" }}
                onChange={this.props.handleDescriptionProp}
                data={this.props.stateValues.description}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-3">
              <label htmlFor="level">Difficulty Level</label>
            </div>
            <div className="col-md-9">
              <select
                className="form-control"
                name="level"
                onChange={this.props.handleInputProp}
                value={this.props.stateValues.level}
                id="level"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
                <option>Expert</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-3">
              <label htmlFor="languages">Allowed Languages</label>
            </div>
            <div className="col-md-9">
              <select
                className="form-control"
                name="languages"
                onChange={this.props.handleInputProp}
                id="languages"
                value={this.props.stateValues.languages}
              >
                <option>javascript</option>
                <option>python</option>
                <option>java</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-3">
              <label htmlFor="points">Maximum Points</label>
            </div>
            <div className="col-md-9">
              <input
                type="number"
                className="form-control"
                name="points"
                onChange={this.props.handleInputProp}
                value={this.props.stateValues.points}
                id="points"
                step="5"
              />
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default ChallengeDesc
