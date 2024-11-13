import React from "react";

function ShopCard() {
  return (
    <div>
      <div className="flex items-center flex-wrap justify-between gap-x-4">
        <SmallCard />
        <SmallCard />
        <SmallCard />
        <SmallCard />
        <SmallCard />
        <SmallCard />
        <SmallCard />
        <SmallCard />
      </div>
    </div>
  );
}

export default ShopCard;

const SmallCard = () => {
  return (
    <div>
      <img
        src="/images/cards/watches.png"
        alt=""
        className="w-[300px] h-[300px]"
      />
    </div>
  );
};
