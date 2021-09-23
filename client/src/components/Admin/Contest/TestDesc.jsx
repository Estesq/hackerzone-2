import DateTimePicker from "react-datetime-picker";
import React, { Component } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class TestDesc extends Component {
  
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <form className=" w-100 p-3">
            <div className="form-group row">
              <label htmlFor="name" className="col-3 col-form-label">name</label>
              <div className="col-9">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  onChange={this.props.handleInputProp}
                  value={this.props.stateValues.name}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="overview" className="col-3 col-form-label">Overview</label>
              <div className="col-9">
                <CKEditor
                  editor={ClassicEditor}
                  onReady={editor => {
                    console.log('Editor is ready to use!', editor);
                  }}
                  style={{ height: "200px" }}
                  id="overview"
                  name="overview"
                  onChange={this.props.handleOverviewProp}
                  data={this.props.stateValues.overview}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="start_date" className="col-3 col-form-label">Start Date</label>
              <div className="col-9">
                <DateTimePicker
                  from={new Date()}
                  value={this.props.stateValues.start_date}
                  name="start_date"
                  onChange={this.props.handleStartProp}
                />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="end_date" className="col-3 col-form-label">End Date</label>
              <div className="col-9">
                <DateTimePicker
                  from={this.props.stateValues.start_date}
                  value={this.props.stateValues.end_date}
                  name="end_date"
                  onChange={this.props.handleEndProp}
                />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="description" className="col-3 col-form-label">Description</label>
              <div className="col-9">
                <CKEditor
                  editor={ClassicEditor}
                  onReady={editor => {
                    console.log('Editor is ready to use!', editor);
                  }}
                  style={{ height: "200px" }}
                  id="description"
                  name="description"
                  onChange={this.props.handleDescriptionProp}
                  data={this.props.stateValues.description}
                />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-3 col-form-label" htmlFor="tagline">Tags</div>
              <div className="col-9">
              <input
                  type="text"
                  className="form-control"
                  id="tagline"
                  name="tagline"
                  onChange={this.props.handleInputProp}
                  value={this.props.stateValues.tagline}
                />
              </div>
            </div>

          </form>
        </div>
      </div>

    )
  }
}

export default TestDesc

