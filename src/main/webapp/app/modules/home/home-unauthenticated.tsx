import '../../app.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const home = () => (
  <div>
    <br />
    <br />
    <p className="font-weight-bold">
      <span>To get started, please </span>
      <Link to="/login" className="alert-link">
        <FontAwesomeIcon icon="sign-in-alt" /> sign in
      </Link>
    </p>
    <p>
      If you have any questions about the application please{' '}
      <a href="mailto: bogdanmihoci27@gmail.com" target="_blank" rel="noopener noreferrer">
        email
      </a>{' '}
      me.{' '}
    </p>
    <ul>
      <li>
        <p>
          Find the code on{' '}
          <a href="https://github.com/Streeam/CompanyInformationDatabase" target="_blank" rel="noopener noreferrer">
            {' '}
            GitHub.
          </a>
        </p>
      </li>
      <li>
        <p>
          Connect with me on{' '}
          <a href="https://linkedin.com/in/bogdan-mihoci-729561188" target="_blank" rel="noopener noreferrer">
            linkedin.
          </a>{' '}
        </p>
      </li>
{/*<li>
        <p>
          Check out my UPDATE{' '}
          <a href="content/documents/resume.pdf" target="_blank" rel="noopener noreferrer">
            CV.
          </a>{' '}
        </p>
      </li> */}
      <li>
        <p>
          Report an{' '}
          <a href="https://github.com/Streeam/CompanyInformationDatabase/issues" target="_blank" rel="noopener noreferrer">
            issue.
          </a>{' '}
        </p>
      </li>
    </ul>
    <div>
      Don't have an account yet?&nbsp;
      <Link to="/register" className="alert-link">
        Register a new account OR
      </Link>
    </div>
    <div>
      Sign in as an existing user:&nbsp;
      <ul>
      <li>
        <p>
          username: <p>wade</p>
        </p>
      </li>
      <li>
        <p>
          password: <p>Wade123!</p>
        </p>
      </li>
    </ul>
    </div>
    <br />
    <br />
  </div>
);

export default home;
