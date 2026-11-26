import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Link } from 'react-router-dom';
import './App.scss';
const starter = [{ id: '1', name: 'White tee', category: 'Top', color: '#f5f1e9' }, { id: '2', name: 'Black jeans', category: 'Bottom', color: '#292929' }, { id: '3', name: 'Everyday sneakers', category: 'Shoes', color: '#d2c5b2' }];
function readSaved(key, fallback) { try { const value = JSON.parse(localStorage.getItem(key)); return Array.isArray(value) ? value : fallback; } catch { return fallback; } }
function Home({ items, outfits }) { return <section className="hero"><p className="eyebrow">YOUR STYLE, YOUR SPACE</p><h1>Make more of<br />what you own.</h1><p>Organise your wardrobe and put your next look together.</p><div className="actions"><Link className="button" to="/wardrobe">Open wardrobe</Link><Link className="button secondary" to="/builder">Build an outfit</Link></div><div className="stats"><p><strong>{items.length}</strong> wardrobe pieces</p><p><strong>{outfits.length}</strong> saved outfits</p></div></section>; }
function Wardrobe({ items, setItems }) {
  const [filter, setFilter] = useState('All'); const [message, setMessage] = useState('');
  function add(event) {
    event.preventDefault(); const form = event.currentTarget; const data = new FormData(form); const name = data.get('name').trim();
    if (!name) { setMessage('Enter a clothing name.'); return; }
    setItems([...items, { id: crypto.randomUUID(), name, category: data.get('category'), color: data.get('color') }]); form.reset(); setMessage('Item added to your wardrobe.');
  }
  return <><div className="page-heading"><div><p className="eyebrow">YOUR COLLECTION</p><h1>My wardrobe</h1></div><label>Category<select value={filter} onChange={e => setFilter(e.target.value)}>{['All','Top','Bottom','Shoes','Outerwear','Accessory'].map(v => <option key={v}>{v}</option>)}</select></label></div>
    <form className="add-form" onSubmit={add}><label>Item name<input name="name" required maxLength="80" placeholder="e.g. Blue denim jacket" /></label><label>Category<select name="category">{['Top','Bottom','Shoes','Outerwear','Accessory'].map(v => <option key={v}>{v}</option>)}</select></label><label>Colour<input name="color" type="color" defaultValue="#a4b7a1" /></label><button>Add item</button></form>
    <p role="status">{message}</p><div className="wardrobe-grid">{items.filter(item => filter === 'All' || item.category === filter).map(item => <article className="piece" key={item.id}><div className="swatch" style={{ backgroundColor: item.color }}><span>{item.category}</span></div><h2>{item.name}</h2><p>{item.category}</p><button className="text-button" onClick={() => { setItems(items.filter(other => other.id !== item.id)); setMessage('Item removed.'); }} aria-label={`Remove ${item.name}`}>Remove</button></article>)}</div>{items.length === 0 && <p>Add your first piece to get started.</p>}</>;
}
function Builder({ items, outfits, setOutfits }) {
  const [selection, setSelection] = useState({}); const [message, setMessage] = useState('');
  const categories = ['Top','Bottom','Shoes'];
  function save(event) { event.preventDefault(); const name = new FormData(event.currentTarget).get('name').trim(); const ids = categories.map(category => selection[category]);
    if (!name || ids.some(id => !items.some(item => item.id === id))) { setMessage('Name your outfit and select a top, bottom, and shoes.'); return; }
    setOutfits([...outfits, { id: crypto.randomUUID(), name, items: ids.map(id => ({ ...items.find(item => item.id === id) })) }]); event.currentTarget.reset(); setMessage('Outfit saved.');
  }
  return <><p className="eyebrow">PUT IT TOGETHER</p><h1>Outfit builder</h1><form onSubmit={save}><div className="builder-grid">{categories.map(category => { const chosen = items.find(item => item.id === selection[category]); return <label className="builder-slot" key={category}><div className="swatch" style={{backgroundColor:chosen?.color || '#eae6df'}}>{chosen?.name || `Choose ${category.toLowerCase()}`}</div>{category}<select required value={selection[category] || ''} onChange={e => setSelection({...selection,[category]:e.target.value})}><option value="">Select {category.toLowerCase()}</option>{items.filter(item => item.category === category).map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>; })}</div><div className="actions"><label>Outfit name<input name="name" required placeholder="e.g. Friday casual" /></label><button>Save outfit</button></div></form><p role="status">{message}</p><h2 className="saved-heading">Saved outfits</h2><div className="outfit-list">{outfits.map(outfit => <article key={outfit.id}><h3>{outfit.name}</h3><p>{outfit.items.map(item => item.name).join(' + ')}</p><button className="text-button" onClick={() => setOutfits(outfits.filter(other => other.id !== outfit.id))}>Remove {outfit.name}</button></article>)}</div></>;
}
export default function App() {
  const [items, updateItems] = useState(() => readSaved('drip-room-items',starter)); const [outfits, updateOutfits] = useState(() => readSaved('drip-room-outfits',[])); const [storageError, setStorageError] = useState('');
  function persist(key, value, update) { update(value); try { localStorage.setItem(key,JSON.stringify(value)); setStorageError(''); } catch { setStorageError('Changes could not be saved on this device.'); } }
  const setItems = value => persist('drip-room-items',value,updateItems); const setOutfits = value => persist('drip-room-outfits',value,updateOutfits);
  return <BrowserRouter><header><Link className="brand" to="/">DRIP ROOM<span>THE DIGITAL WARDROBE</span></Link><nav aria-label="Main navigation"><NavLink to="/">Home</NavLink><NavLink to="/wardrobe">My Wardrobe</NavLink><NavLink to="/builder">Outfit Builder</NavLink></nav></header><main>{storageError && <p role="alert">{storageError}</p>}<Routes><Route path="/" element={<Home items={items} outfits={outfits} />} /><Route path="/wardrobe" element={<Wardrobe items={items} setItems={setItems} />} /><Route path="/builder" element={<Builder items={items} outfits={outfits} setOutfits={setOutfits} />} /><Route path="*" element={<><h1>Page not found</h1><Link to="/">Home</Link></>} /></Routes></main><footer>Drip Room · Declan Wilde · Project 3</footer></BrowserRouter>;
}
