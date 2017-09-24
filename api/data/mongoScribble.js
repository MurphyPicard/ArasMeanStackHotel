db.hotelCollection.update(
  {},
  {
    $set: {
      "reviews.0._id": ObjectId()
    }
  },
  {
    multi: true
  }
)
