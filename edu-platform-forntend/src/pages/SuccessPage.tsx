import './style/successPage.css';

const SuccessPage = () => {
    return (
        <div className="success-container">
            <h1 className="success-title">Success!</h1>
            <p className="success-message">Your operation was successful.</p>
            <a href="/" className="success-button">Go to Dashboard</a>
        </div>
    );
};

export default SuccessPage;
