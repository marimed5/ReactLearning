import author from "../../assets/author.png";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { OpenModal } from "../../layout/Navbar";

export function NftSection({ newNft }) {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNft, setSelectedNft] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/nfts")
      .then((response) => {
        setNfts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching data");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (newNft) {
      setNfts((prevNfts) => [...prevNfts, newNft]);
    }
  }, [newNft]);

  const openEditModal = (nft) => {
    setSelectedNft(nft);
    setModalOpen(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  //If nft is empty
  if (nfts.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="grid xlm:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 py-6 gap-8">
      {nfts?.map((nft) => (
        <NftCard key={nft.id} nft={nft} onEdit={() => openEditModal(nft)} />
      ))}
      {modalOpen && (
        <OpenModal
          modal={modalOpen}
          close={() => setModalOpen(false)}
          nft={selectedNft}
        />
      )}
    </div>
  );
}

function NftCard({ nft, onEdit }) {
  return (
    <div className="card border border-secondary-border rounded-xl border-solid p-2">
      <div>
        <img className="w-full max-h-[350px]" src={nft.img} alt="nft" />
      </div>
      <div className="pt-2 flex flex-col gap-1 relative">
        <span className="text-sm text-[#A1A1AA]">{nft.title}</span>
        <h1>{nft.reference}</h1>
        {/* Edit button */}
        <button
          onClick={onEdit}
          className="w-20 h-10 right-2 absolute gap-1 rounded-xl bg-zinc-700"
        >
          <span>Edit</span>
        </button>
      </div>
      <div className="py-2 mt-3 flex justify-between rounded-xl px-3 bg-zinc-800 items-center">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-[#A1A1AA]">Author</span>
          <div className="text-sm xl:text-base flex gap-1">
            <img src={author} alt="author" />
            <p>{nft.author}</p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-[#A1A1AA]">Price</span>
          <div className="text-sm xl:text-base flex gap-1 items-center">
            <div className="flex gap-1">
              <p>{nft.priceEth}</p>
              <span>ETH</span>
            </div>
            <span className="text-[#A1A1AA] text-xs">${nft.priceUsd}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
