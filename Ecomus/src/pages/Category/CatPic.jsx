import React from "react";
import dress from "../../../src/img/Fashion needles dress.jpg";
import duppata from "../../../src/img/Fashion Needles Duppata.jpg";
import kurtas from "../../../src/img/Fashion needles Kurtas.jpg";
import lower from "../../../src/img/Fashion needles Lower.jpg";
import men from "../../../src/img/fashion needles mens.jpg";
import { useNavigate } from "react-router-dom";

function CatPic() {
  const [category, setCategory] = React.useState([
    { id: 1, name: "Dress", image: dress },
    { id: 2, name: "Blazers & Trenchcoat", image: duppata },
    { id: 3, name: "Kurtas", image: kurtas },
    { id: 4, name: "Lower", image: lower },
    { id: 5, name: "MEN", image: men },
  ]);
  const nvg = useNavigate();
  return (
    <div className="flex flex-wrap w-full">
      {category.map((item) => (
        <div
          key={item.id}
          className="relative h-[550px] sm:h-[630px] md:h-[700px] w-full sm:w-1/2 lg:w-1/3"
        >
          <img
            className="h-full w-full object-cover"
            src={item.image}
            alt={item.name}
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
            <p className="text-white text-2xl font-bold">{item.name}</p>
            <button
              onClick={() =>
                nvg(`/category/${item.name}`, {
                   
                })
              }
              className="bg-white text-black font-light px-6 py-2 mt-2 shadow-lg transform transition-transform duration-300 hover:scale-105"
            >
              View Products
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CatPic;
