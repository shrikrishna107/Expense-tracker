'use client'
import React, { useState, useEffect } from "react";
import { collection, doc, addDoc, query, onSnapshot, deleteDoc } from "firebase/firestore";
import { db } from './firebase'

export default function Home() {

  const [items, setitem] = useState([
    // { name: "Coffee", price: 800 },
    // { name: "Movie", price: 1500 },
    // { name: "chocolate", price: 150 },
  ]);

  const [newitem, setnewitem] = useState({ name: '', price: '' });
  const [total, setTotal] = useState(0);

  // Add items to database

  const additem = async (e) => {
    e.preventDefault();
    if (newitem.name !== '' && newitem.price !== '') {
      // setitem([...items, newitem]);
      await addDoc(collection(db, 'items'), {
        name: newitem.name.trim(),
        price: newitem.price,
      });
      setnewitem({ name: '', price: '' });
    }
  }

  // Read items from database

  useEffect(() => {
    const q = query(collection(db, 'items'));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let itemsArr = []

      QuerySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id })
      })
      setitem(itemsArr);

      //Read Total from the itemsArr

      const calTotal = () => {
        const totalprice = itemsArr.reduce((sum, item) => sum + parseFloat(item.price), 0);
        setTotal(totalprice)
      }

      calTotal();
      return () => unsubscribe();
    });
  }, []);

  // Delete items from database

  const deleteitem = async (id) => {
    await deleteDoc(doc(db, 'items', id));
  }

  return (
    <div>
      <div className=" bg-slate-800 w-full p-4 rounded-lg ">
        <div className=" flex items-center gap-10">
          <input value={newitem.name} onChange={(e) => setnewitem({ ...newitem, name: e.target.value })} className=" bg-white p-3 text-black rounded-lg w-[580px]" placeholder="Enter the name" type="text" />
          <input value={newitem.price} onChange={(e) => setnewitem({ ...newitem, price: e.target.value })} className=" bg-white p-3 text-black rounded-lg w-96" placeholder="Enter the price in ₹" type="number" />
          <button type="submit" onClick={additem} className=" bg-slate-900 hover:bg-slate-950 transition w-28 p-3 rounded-lg">+</button>
        </div>

        <div>
          {items.map((item, id) => (
            <div key={id} className=" my-4 w-full bg-slate-950 flex justify-between rounded-lg">
              <div className=" flex justify-between w-full p-4 font-serif">
                <span className=" capitalize">{item.name}</span>
                <span>₹{item.price}</span>
              </div>
              <button onClick={() => deleteitem(item.id)} className=" p-4 hover:bg-slate-900 hover:rounded-lg border-l-2 border-slate-900 hover:scale-110 transition">X</button>
            </div>
          ))}
        </div>
        {items.length < 1 ? ("") : (
          <div className=" p-4 flex justify-between font-serif">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        )}
      </div>
    </div>
  );
}