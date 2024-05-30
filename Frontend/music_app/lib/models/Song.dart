import 'dart:convert';
import 'dart:typed_data';

import 'package:flutter/material.dart';

class Song with ChangeNotifier {
  final String name;
  final String id;
  final String sinhalaName;
  final String artistPhotoData; // Base64 encoded
  final String lyricsData;      // Base64 encoded 
  final String songCodeData;    // Base64 encoded
  final String songNotationData; // Base64 encoded
  final String codeCredit;
  final String notationCredit;

  Song(this.name, this.id, this.sinhalaName, this.artistPhotoData, this.lyricsData, this.songCodeData, this.songNotationData, this.codeCredit, this.notationCredit);



}
