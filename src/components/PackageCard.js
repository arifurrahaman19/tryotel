export default function PackageCard({ pack }) {
  const icons = [
    "/assets/icons/air.svg",
    "/assets/icons/hotels.svg",
    "/assets/icons/dine.svg",
    "/assets/icons/car.svg",
    "/assets/icons/cruise.svg",
    "/assets/icons/train.svg",
    "/assets/icons/bus.svg",
    "/assets/icons/signboard.svg",
  ];

  function reduceText(text, title) {
    switch (title) {
      case "title":
        if (text.length >= 24) {
          return `${text.substring(0, 24)}...`;
        } else {
          return text;
        }

      case "description":
        if (text.length >= 76) {
          return `${text.substring(0, 76)}...`;
        } else {
          return text;
        }
    }
  }

  return (
    <div className="package">
      <div className="package__desc grid-container">
        <div className="package__desc--image">
          {pack?.images[0]?.url.includes("https") ? (
            <img src={pack?.images[0]?.url} />
          ) : (
            <div className="no-image">
              <h5>Image not available</h5>
            </div>
          )}
        </div>
        <div className="package__desc--contents">
          <h2>{reduceText(pack?.title, "title")}</h2>
          <p>{reduceText(pack?.description, "description")}</p>
          <div className="features">
            <div className="duration grid-container">
              <img src="/assets/icons/calendar.svg" />
              <h4>
                {pack?.duration + 1} night {pack?.duration} Days
              </h4>
            </div>

            <div className="loyality-points grid-container">
              <img src="/assets/icons/loyality.svg" />
              <h4>{pack?.loyalityPoint} Flightlocal points</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="package__includes grid-container">
        <div className="include-features">
          <p>Includes:</p>

          <div className="icons">
            {icons.map((icon) => {
              return <img key={icons.indexOf(icon)} src={icon} />;
            })}
          </div>
        </div>
        <div className="price-start">
          <p>Starts from</p>
          <h3>‎৳ {pack?.startingPrice}</h3>
        </div>
      </div>

      <div className="best-value">
        <img src="/assets/icons/star.svg" />
        <p>Best Value</p>
      </div>
    </div>
  );
}
