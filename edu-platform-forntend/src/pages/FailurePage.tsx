import './style/failure.css'; // Import the CSS file

const FailurePage = () => {
    return (
        <div className="failure-container">
            <h1 className="failure-title">Error!</h1>
            <p className="failure-message">There was an issue with your operation.</p>
            <a href="/" className="failure-button">Try Again</a>
        </div>
    );
};

export default FailurePage;
