import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { CandidateSchema } from "./Validations/Candidate";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import LoadingPage from './LoadingPage';
import { useSelector } from 'react-redux';
export default function InterviewCandidate() {
 // const token = localStorage.getItem("response-token");
 const  token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      candidateName: "",
      emailId: "",
      contactNo: "",
      address: "",
      highestQualification: "",
      workExperience: "",
      technicalStack: "",
      cvShortlisted: "",
      lastCTC: "",
      noticePeriod: "",
      dob: "",
    },
    validationSchema: CandidateSchema,
    onSubmit: (values, action) => {
      setLoading(true); 
      console.log(values);
      axios
        .post(
          `/apigateway/hrms/interviewCandidate/saveInterviewCandidate`,
          {
            candidateName: values.candidateName,
            emailId: values.emailId,
            contactNo: values.contactNo,
            address: values.address,
            highestQualification: values.highestQualification,
            workExperience: values.workExperience,
            technicalStack: values.technicalStack,
            cvShortlisted: values.cvShortlisted,
            lastCTC: values.lastCTC,
            expectedCTC: values.expectedCTC,
            passingYear: values.passingYear,
            noticePeriod: parseInt(values.noticePeriod),
            dob: values.dob,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          toast.success("Candidate details successfully created !!" ||response.data, {
            position: "top-center",
            theme: "colored",
          });
          setLoading(false); 
        })
        .catch((error) => {
          console.log(error);
          toast.error(
            error.response.data.message || "Error creating candidate."
          );
          setLoading(false); 
        });
      action.resetForm();
    },
  });

  return (
    <>
      <div>
        <div className=" mt-3 ">
        {loading ? <LoadingPage/> : ''}
          <nav
            aria-label="breadcrumb"
            style={{ "--bs-breadcrumb-divider": "'>>'" }}
          >
            <ol className="breadcrumb" style={{ color: "white" ,marginLeft:'20px'}}>
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>{" "}
              </li>
              <li className="breadcrumb-item">
              <Link to="">Hiring</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Create Candidate Details
              </li>
            </ol>
          </nav>
        </div>
        <div className="container pt-3">
          <div className="row">
            <div className="col-lg-8 col-md-8 mx-auto">
              <div
                className="card border-0 shadow"
                style={{ width: "700px", height: "1150px" }}
              >
                <div className="card-body">
                  <form
                    className="container py-3  mb-3"
                    onSubmit={formik.handleSubmit}
                  >
                    <div className="row mb-3">
                      <label
                        htmlFor="Interviewer Name"
                        className="col-sm-2 col-form-label"
                        name="candidateName"
                      >
                        Candidate Name
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text "
                          id="candidateName"
                          name="candidateName"
                          step="0.1"
                          placeholder="Enter Your Name"
                          className={`form-control ${
                            formik.touched.candidateName &&
                            formik.errors.candidateName
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.candidateName}
                        />
                        {formik.touched.candidateName &&
                        formik.errors.candidateName ? (
                          <div className="invalid-feedback">
                            {formik.errors.candidateName}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="emailId"
                        className="col-sm-2 col-form-label"
                      >
                        Email Id
                      </label>
                      <div className="col-sm-10">
                        <input
                          placeholder="Enter Email"
                          type="email"
                          id="emailId"
                          name="emailId"
                          className={`form-control ${
                            formik.touched.emailId && formik.errors.emailId
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.emailId}
                        />
                        {formik.touched.emailId && formik.errors.emailId ? (
                          <div className="invalid-feedback">
                            {formik.errors.emailId}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="ContactNumber "
                        className="col-sm-2 col-form-label"
                      >
                        Contact Number
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="number "
                          id="contactNo"
                          name="contactNo"
                          step="0.1"
                          placeholder="Enter Number"
                          className={`form-control ${
                            formik.touched.contactNo && formik.errors.contactNo
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.contactNo}
                        />
                        {formik.touched.contactNo && formik.errors.contactNo ? (
                          <div className="invalid-feedback">
                            {formik.errors.contactNo}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="Address"
                        className="col-sm-2 col-form-label"
                        name="address"
                      >
                        Address
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text "
                          id="address"
                          name="address"
                          step="0.1"
                          placeholder="Enter Your Address"
                          className={`form-control ${
                            formik.touched.address && formik.errors.address
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.address}
                        />
                        {formik.touched.address && formik.errors.address ? (
                          <div className="invalid-feedback">
                            {formik.errors.address}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="highestQualification"
                        className="col-sm-2 col-form-label"
                        name="highestQualification"
                      >
                        Highest Qualification
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text "
                          id="highestQualification"
                          name="highestQualification"
                          step="0.1"
                          placeholder="Enter Your Highest Qualification"
                          className={`form-control ${
                            formik.touched.highestQualification &&
                            formik.errors.highestQualification
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.highestQualification}
                        />
                        {formik.touched.highestQualification &&
                        formik.errors.highestQualification ? (
                          <div className="invalid-feedback">
                            {formik.errors.highestQualification}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="WorkExperience "
                        className="col-sm-2 col-form-label"
                      >
                        Work Experience
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="number "
                          id="workExperience"
                          name="workExperience"
                          step="0.1"
                          placeholder="Enter Experience"
                          className={`form-control ${
                            formik.touched.workExperience &&
                            formik.errors.workExperience
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.workExperience}
                        />
                        {formik.touched.workExperience &&
                        formik.errors.workExperience ? (
                          <div className="invalid-feedback">
                            {formik.errors.workExperience}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="technicalStack"
                        className="col-sm-2 col-form-label"
                        name="technicalStack"
                      >
                        {" "}
                        Technical Stack
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text "
                          id="technicalStack"
                          name="technicalStack"
                          step="0.1"
                          placeholder="Enter Your Technical Stack"
                          className={`form-control ${
                            formik.touched.technicalStack &&
                            formik.errors.technicalStack
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.technicalStack}
                        />
                        {formik.touched.technicalStack &&
                        formik.errors.technicalStack ? (
                          <div className="invalid-feedback">
                            {formik.errors.technicalStack}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="lastCTC"
                        className="col-sm-2 col-form-label"
                      >
                        {" "}
                        Last CTC
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          id="lastCTC"
                          name="lastCTC"
                          placeholder="Enter Last CTC"
                          className={`form-control ${
                            formik.touched.lastCTC && formik.errors.lastCTC
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.lastCTC}
                        />
                        {formik.touched.lastCTC && formik.errors.lastCTC ? (
                          <div className="invalid-feedback">
                            {formik.errors.lastCTC}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="expectedCTC"
                        className="col-sm-2 col-form-label"
                      >
                        {" "}
                        Expected CTC
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          id="expectedCTC"
                          name="expectedCTC"
                          placeholder="Enter Expected CTC"
                          className={`form-control ${
                            formik.touched.expectedCTC && formik.errors.expectedCTC
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.expectedCTC}
                        />
                        {formik.touched.lastCTC && formik.errors.expectedCTC ? (
                          <div className="invalid-feedback">
                            {formik.errors.expectedCTC}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="passingYear "
                        className="col-sm-2 col-form-label"
                      >
                        Passing Year
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          id="passingYear"
                          name="passingYear"
                          step="0.1"
                          placeholder="Enter Passing Year"
                          className={`form-control ${
                            formik.touched.passingYear &&
                            formik.errors.passingYear
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.passingYear}
                        />
                        {formik.touched.passingYear &&
                        formik.errors.passingYear ? (
                          <div className="invalid-feedback">
                            {formik.errors.passingYear}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="noticePeriod"
                        className="col-sm-2 col-form-label"
                      >
                        Notice Period
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="number "
                          id="noticePeriod"
                          name="noticePeriod"
                          step="0.1"
                          placeholder="Enter Notice Period"
                          className={`form-control ${
                            formik.touched.noticePeriod &&
                            formik.errors.noticePeriod
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.noticePeriod}
                        />
                        {formik.touched.noticePeriod &&
                        formik.errors.noticePeriod ? (
                          <div className="invalid-feedback">
                            {formik.errors.noticePeriod}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <fieldset className="row mb-3">
                      <legend className="col-form-label col-sm-2 pt-0">
                        CV Shortlisted
                      </legend>
                      <div className="col-sm-10">
                        <div className="form-check form-check-inline">
                          <input
                            onChange={(event) => {
                              formik.setFieldValue("cvShortlisted", true);
                            }}
                            onBlur={formik.handleBlur}
                            checked={formik.values.cvShortlisted === true}
                            className={`form-control ${
                              formik.touched.cvShortlisted &&
                              formik.errors.cvShortlisted
                                ? "is-invalid"
                                : ""
                            }`}
                            type="radio"
                            name="cvShortlisted"
                            id="remote"
                            value="true"
                          />

                          {formik.touched.cvShortlisted &&
                          formik.errors.cvShortlisted ? (
                            <div className="invalid-feedback">
                              {formik.errors.cvShortlisted}
                            </div>
                          ) : null}

                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio1"
                          >
                            Yes
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            onChange={(event) => {
                              formik.setFieldValue("cvShortlisted", false);
                            }}
                            onBlur={formik.handleBlur}
                            checked={formik.values.cvShortlisted === false}
                            className={`form-control ${
                              formik.touched.cvShortlisted &&
                              formik.errors.cvShortlisted
                                ? "is-invalid"
                                : ""
                            }`}
                            type="radio"
                            name="cvShortlisted"
                            id="remote"
                            value="false"
                          />

                          {formik.touched.cvShortlisted &&
                          formik.errors.cvShortlisted ? (
                            <div className="invalid-feedback">
                              {formik.errors.cvShortlisted}
                            </div>
                          ) : null}

                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio1"
                          >
                            No
                          </label>
                        </div>
                      </div>
                    </fieldset>
                    <div className="row mb-3">
                      <label htmlFor="dob" className="col-sm-2 col-form-label">
                        dob
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="date"
                          id="dob"
                          name="dob"
                          className={`form-control ${
                            formik.touched.dob && formik.errors.dob
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.dob}
                        />
                        {formik.touched.dob && formik.errors.dob ? (
                          <div className="invalid-feedback">
                            {formik.errors.dob}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="d-grid gap-2 col-6 mx-auto">
                      <button className="btn btn-outline-danger" type="submit">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
