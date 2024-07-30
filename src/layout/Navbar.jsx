import avatar from "../assets/avatar.png";
import logo from "../assets/logo.svg";
import {
  Bag,
  BarChart,
  ChevronDown,
  Cursor,
  Menu,
  Plus,
} from "../assets/Icons";
import { Button } from "../components/shared/Button";
import { LayoutContainer } from "./LayoutContainer";
import React, { useState, useEffect } from "react";
import axios from "axios";

export function OpenModal({ modal, close, nft }) {
  if (!modal) return null;

  const [title, setTitle] = useState(nft ? nft.title : "");
  const [reference, setReference] = useState(nft ? nft.reference : "");
  const [author, setAuthor] = useState(nft ? nft.author : "");
  const [ethPrice, setEthPrice] = useState(nft ? nft.priceEth : 0);
  const [usdPrice, setUsdPrice] = useState(nft ? nft.priceUsd : 0);
  const [img, setImg] = useState(nft ? nft.image : "");

  useEffect(() => {
    if (nft) {
      setTitle(nft.title);
      setReference(nft.reference);
      setAuthor(nft.author);
      setEthPrice(nft.priceEth);
      setUsdPrice(nft.priceUsd);
      setImg(nft.img);
    }
  }, [nft]);

  const handleChanges = () => {
    const newNft = {
      id: nft ? nft.id : new Date().getTime(),
      title: title,
      reference: reference,
      author: author,
      priceEth: parseFloat(ethPrice),
      priceUsd: parseFloat(usdPrice),
      img: img,
    };

    if (!nft) {
      axios.post("http://localhost:3000/nfts", newNft);
    } else {
      axios.put(`http://localhost:3000/nfts/${nft.id}`, newNft);
    }
    close();
    alert("Saved");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-900 text-white p-4 rounded w-200">
        <h2 className="text-xl font-bold mb-4">
          {nft ? "Edit NFT" : "Add New NFT"}
        </h2>
        <div>Title</div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="text-black"
        ></input>
        <div>Reference</div>
        <input
          type="text"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          required
          className="text-black"
        ></input>
        <div>Author</div>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="text-black"
        ></input>
        <div>Eth Price</div>
        <input
          type="number"
          value={ethPrice}
          onChange={(e) => setEthPrice(e.target.value)}
          required
          className="text-black"
        ></input>
        <div>USD Price</div>
        <input
          type="number"
          value={usdPrice}
          onChange={(e) => setUsdPrice(e.target.value)}
          required
          className="text-black"
        ></input>
        <div>Image Address</div>
        <input
          type="text"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          required
          className="text-black"
        ></input>
        <div className="flex justify-end gap-2">
          <button onClick={close} className="px-4 py-2 bg-gray-600 rounded">
            Close
          </button>
          <button
            onClick={handleChanges}
            className="px-4 py-2 bg-blue-500 rounded"
          >
            {nft ? "Save Changes" : "Add NFT"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const [modal, setModal] = useState(false);

  return (
    <LayoutContainer>
      <div className="p-4 md:hidden">
        <Menu />
      </div>
      <div className="justify-between hidden md:flex">
        <div className="flex gap-8 items-center">
          <a href="/">
            <img src={logo} alt="logo" className="h-6" />
          </a>
          <ul className="flex gap-4">
            <NavItem Icon={Cursor} title="Discover" url="/discover" />
            <NavItem
              isActive
              Icon={Bag}
              title="Marketplace"
              url="/marketplace"
            />
            <NavItem Icon={BarChart} title="Leaderboards" url="/leaderboards" />
          </ul>
        </div>
        <div className="flex gap-4">
          <Button
            onClick={() => setModal(true)}
            className="flex items-center gap-1 rounded-xl px-3 bg-zinc-700"
            variant="ghost"
          >
            <span>Add NFT</span>
            <Plus />
          </Button>
          <div className="flex gap-1 items-center">
            <img className="h-6 w-6" src={avatar} />
            <Button variant="ghost" size="icon">
              <ChevronDown />
            </Button>
          </div>
        </div>
      </div>
      <OpenModal modal={modal} close={() => setModal(false)} />
    </LayoutContainer>
  );
}

function NavItem({ Icon, title, url, isActive = false }) {
  return (
    <a
      className={`flex gap-2 items-center ${
        isActive ? "rounded-xl p-2 bg-zinc-700" : undefined
      }`}
      href={url}
    >
      <Icon />
      <li>{title}</li>
    </a>
  );
}
