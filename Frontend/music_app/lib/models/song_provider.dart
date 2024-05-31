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

  void addSongs(List<Song> songs) {
    for (Song song in songs) {
      _songs.add(song);
    }
  }

  // void addSong(Song song) {
  //   _songs.add(song);

  //   notifyListeners();
  // }
}
