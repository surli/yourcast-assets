package fr.unice.yourcast.sources.twitter

class TwitterTL {

    String userName
    
    String maxTweets
    
    static constraints = {
        maxTweets(nullable: true, range: 1..100)
        userName (blank:false)
    }
}
