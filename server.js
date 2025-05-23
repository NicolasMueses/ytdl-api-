const express = require('express');
const ytdl = require('ytdl-core');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/video-info', async (req, res) => {
  const videoUrl = req.query.url;

  if (!videoUrl || !ytdl.validateURL(videoUrl)) {
    return res.status(400).json({ error: 'URL inválida o no proporcionada' });
  }

  try {
    const info = await ytdl.getInfo(videoUrl);

    const videoDetails = {
      title: info.videoDetails.title,
      lengthSeconds: info.videoDetails.lengthSeconds,
      author: info.videoDetails.author.name,
      thumbnail: info.videoDetails.thumbnails.pop().url,
      viewCount: info.videoDetails.viewCount,
      uploadDate: info.videoDetails.uploadDate,
    };

    res.json(videoDetails);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener información del video' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
