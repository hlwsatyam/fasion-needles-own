import { useState } from "react";
import {
  Card,
  CardBody,
  Rating,
  Typography,
  Button,
  Input,
  Avatar,
} from "@material-tailwind/react";
import { usePostCommentMutation } from "../store/api/commentapi";
import { toast } from "react-toastify";

function CardReview({ name, feedback, date, title, rating }) {
  return (
    <Card
      shadow={false}
      className="my-4 w-full   rounded-lg bg-gradient-to-r from-white to-gray-100 hover:shadow-xl transition-shadow duration-300"
    >
      <CardBody className="pt-0">
        <div className="flex items-center mb-4">
          <span className="w-[40px] h-[40px] rounded-full bg-gray-500 text-white flex items-center justify-center mr-4">
            {name.slice(0, 2).toUpperCase()}
          </span>

          <div >
            <Typography variant="h6" color="blue-gray" className="font-bold">
              {name}
            </Typography>
            <Typography variant="small" className="font-normal !text-gray-500">
              {date}
            </Typography>
          </div>
        </div>
        <Rating value={rating} className="flex text-amber-500 mb-3" />
        <Typography variant="h6" color="blue-gray" className="font-bold mb-3">
          {title}
        </Typography>
        <Typography className="text-sm font-normal !text-gray-600">
          {feedback}
        </Typography>
      </CardBody>
    </Card>
  );
}

const CONTENTS = [
  {
    title: "This tool has made my workflow seamless",
    name: "Ryan Samuel",
    feedback:
      "I've been using this for a while now, and it's become an essential part of my daily routine. It's incredibly user-friendly and has greatly improved my productivity.",
    date: "03 March 2024",
  },
  {
    title: "It's made my job so much easier",
    name: "Emma Roberts",
    feedback:
      "This tool has been a game-changer for me. From managing my tasks to collaborating with my team, it's made everything so much easier. Highly recommended!",
    date: "14 February 2023",
  },
  {
    title: "It's my go-to solution for staying organized.",
    name: "Bruce Mars",
    feedback:
      "I've been using this for a while now, and it's become an essential part of my daily routine. It's incredibly user-friendly and has greatly improved my productivity.",
    date: "10 February 2023",
  },
];

function AddReviewForm({ onClose }) {
  const [commentApi] = usePostCommentMutation();
  const [data, setData] = useState({
    subject: "",
    description: "",
    rating: 0,
    productId: window.location.href.split("/").pop(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRatingChange = (value) => {
    setData((prevData) => ({
      ...prevData,
      rating: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await commentApi(data);
      toast("Review added successfully");
      onClose();
    } catch (error) {
      toast(error?.message || "Something went wrong");
      onClose();
    }
  };

  return (
    <div className="p-6 border rounded-lg w-full bg-white shadow-lg">
      <Typography variant="h5" className="mb-4 text-center text-blue-gray-700">
        Add Your Review
      </Typography>

      <Input
        name="subject"
        value={data.subject}
        onChange={handleChange}
        placeholder="Subject"
        className="mb-2 rounded border-yellow-300 outline-none py-2 text-sm"
      />
      <Input
        name="description"
        value={data.description}
        onChange={handleChange}
        placeholder="Description"
        className="mb-2 rounded border-yellow-300 outline-none py-2 text-sm"
      />

      <div className="flex gap-x-6 justify-between items-center">
        <Rating
          value={data.rating}
          onChange={handleRatingChange}
          className="flex text-amber-500"
        />
        <Button
          color="blue"
          onClick={onSubmit}
          className="py-2 px-4 flex-1 bg-black shadow-md hover:shadow-lg transition-shadow"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export function OverviewSection3({ getComment }) {
  const [showForm, setShowForm] = useState(false);
  return (
    <section className="container  bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto  flex flex-col lg:flex-row gap-10">
        {/* Left Section */}
        <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
          <Typography
            variant="h6"
            className="mb-4 uppercase text-blue-gray-700"
          >
            Customer reviews
          </Typography>
          <div className="mb-6">
            <Typography className="  font-semibold text-gray-700 flex text-sm items-center">
              5 stars
              <Rating
                style={{ display: "flex", marginLeft: "10px" }}
                value={5}
                className="text-amber-500"
              />
            </Typography>
            <Typography className="text-sm font-semibold text-gray-700 flex items-center">
              4 stars
              <Rating
                style={{ display: "flex", marginLeft: "10px" }}
                value={4}
                className="text-amber-500"
              />
            </Typography>
            <Typography className="text-sm font-semibold text-gray-700 flex items-center">
              3 stars
              <Rating
                style={{ display: "flex", marginLeft: "10px" }}
                value={3}
                className="text-amber-500"
              />
            </Typography>
            <Typography className="text-sm font-semibold text-gray-700 flex items-center">
              2 stars
              <Rating
                style={{ display: "flex", marginLeft: "10px" }}
                value={2}
                className="text-amber-500"
              />
            </Typography>
            <Typography className="text-sm font-semibold text-gray-700 flex items-center">
              1 stars
              <Rating
                style={{ display: "flex", marginLeft: "10px" }}
                value={1}
                className="text-amber-500"
              />
            </Typography>
          </div>
          {!showForm && (
            <Button
              color="blue"
              onClick={() => setShowForm(true)}
              className="w-full rounded bg-black  mb-3 py-2 shadow-lg hover:shadow-xl transition-shadow"
            >
              Add Review
            </Button>
          )}
          {showForm && <AddReviewForm onClose={() => setShowForm(false)} />}
        </div>

        {/* Right Section */}
        <div className="w-full">
          <Typography
            variant="h6"
            className="mb-4 uppercase text-blue-gray-700"
          >
            Recent reviews
          </Typography>
          {getComment?.data.map((item, index) => (
            <CardReview
              key={index}
              title={item?.commentSubject}
              name={item?.user_id?.first_name + " " + item?.user_id?.last_name}
              feedback={item?.commentDescription}
              date={item?.createdAt}
              rating={item?.star}
            />
          ))}
          <div className="flex justify-center items-center my-4 gap-x-3">
            <Button className="bg-gray-500 rounded text-white   px-4 py-1">
              Pev
            </Button>
            <Button className="bg-gray-500 text-white rounded px-4 py-1">
              Next
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OverviewSection3;
