function ArticleCard({ article }) {
    const { image, title, language, datetime, source, link } = article;
  
    return (
      <div className="card">
        {image && image !== 'null' ? (
          <img src={image} alt={title} className="card-image" />
        ) : (
          <div className="no-image" aria-label="No image available">
            No Image Available
          </div>
        )}
  
        <div className="card-content">
          <h3 className="card-title">{title}</h3>
          <p className="card-text">
            {language && (
              <>
                <strong>Language:</strong> {language}
                <br />
              </>
            )}
            {datetime && (
              <>
                <strong>Published:</strong> {datetime}
                <br />
              </>
            )}
            {source && (
              <>
                <strong>Source:</strong> {source}
              </>
            )}
          </p>
        </div>
  
        <div className="card-action">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="read-more"
          >
            Read More →
          </a>
        </div>
      </div>
    );
  }
  
  export default ArticleCard;
  