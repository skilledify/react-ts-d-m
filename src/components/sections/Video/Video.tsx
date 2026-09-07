import SectionTitle from "../../ui/SectionTitle/SectionTitle";



const Video = () => {
  return (
    <section className="video">
      <div className="container">
        {/* <h2 className="section-title video__title">WELCOME TO D&M LEASING</h2> */}
        <SectionTitle  title="WELCOME TO D&M LEASING" marginBottom="20px" align="center"/>
        <p className="video__text item-title">
          Find out how easy it is to lease from D&M
        </p>
        <iframe
          className="video__content"
          width="1000"
          height="500"
          src="https://www.youtube.com/embed/dQrGGHM8xRo?controls=0"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </section>
  );
}

export default Video