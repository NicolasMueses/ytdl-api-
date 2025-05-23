const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/download', async (req, res) => {
  const url = req.query.url;
  if (!url || !ytdl.validateURL(url)) {
    return res.status(400).json({ error: 'URL inválida' });
  }

  const info = await ytdl.getInfo(url);
  const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
  res.json({ downloadUrl: format.url });
});

app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'));
