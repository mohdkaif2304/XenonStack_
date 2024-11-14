import { Locate, LocateFixed, LocateIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const SinglePg = ({
  name,
  location,
  city,
  price,
  description,
  imageURL,
}: {
  name: string;
  location: string;
  city: string;
  price: string;
  description: string;
  imageURL: string;
}) => {
  return (
    <div className="flex items-center gap-8">
      <Image
        alt="Profile picture"
        className="rounded-lg "
        height={300}
        width={300}
        src={imageURL}
        style={{
          // aspectRatio: "100/100",
          objectFit: "cover",
        }}
      />
      <div className="grid gap-1">
        <h2 className="text-2xl font-bold">{name}</h2>
        <div className="text-gray-500 dark:text-gray-400 flex gap-2">
          <Locate /> <span>{location}</span>
        </div>
        <div className="text-gray-500 font-bold dark:text-gray-800 flex gap-2">
          <LocateFixed /> <span>{city}</span>
        </div>

        <div className="font-semibold">₹{price}</div>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
        <Link
          target="_blank"
          href={`https://wa.me/917978016118?text=Hello Sir/Ma'am, I am interested in ${name} with price ₹${price}. Can you please provide more details about this PG?`}
          className="font-semibold flex items-center gap-2 cursor-pointer text-green-500"
        >
          <FaWhatsapp />
          <span>Direct message to owner</span>
        </Link>
      </div>
    </div>
  );
};

export default SinglePg;
