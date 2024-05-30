import 'package:flutter/material.dart';
import 'package:music_app/models/Song.dart';

// ignore: camel_case_types
class SongProvider extends ChangeNotifier {
  List<Song> _songs = [];

  List<Song> get songs => _songs;

  void setSongs(List<Song> newSongs) {
    _songs = newSongs;
    notifyListeners();
  }

  void addSong(List<Song> song) {
    for (Song songs in song) {
       _songs.add(songs);
    }
   
    notifyListeners();
  }
}
