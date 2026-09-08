import Header from "../components/Header/Header";

const PreOwnedCars: React.FC = () => {
  return (
    <section>
      <Header />
      <div className="mx-auto container">
        <div className="flex justify-center items-center min-h-screen text-center">
          <p className="text-[42px]">Page PreOwnedCars</p>
        </div>
      </div>
    </section>
  );
};

export default PreOwnedCars;