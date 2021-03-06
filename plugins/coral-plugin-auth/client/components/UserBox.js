import React from 'react';
import styles from './styles.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import t from 'coral-framework/services/i18n';
import {logout} from 'coral-framework/actions/auth';

const UserBox = ({loggedIn, user, logout, onShowProfile}) => (
  <div>
    {
      loggedIn ? (
        <div className={styles.userBox}>
          <span className={styles.userBoxLoggedIn}>{t('sign_in.logged_in_as')}</span>
          <a onClick={onShowProfile}>{user.username}</a>. {t('sign_in.not_you')}
          <a className={styles.logout} onClick={() => logout()}>
            {t('sign_in.logout')}
          </a>
        </div>
      ) : null
    }
  </div>
);

const mapStateToProps = ({auth}) => ({
  loggedIn: auth.toJS().loggedIn,
  user: auth.toJS().user
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({logout}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserBox);
