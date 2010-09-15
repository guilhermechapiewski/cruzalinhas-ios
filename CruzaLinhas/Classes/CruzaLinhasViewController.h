//
//  CruzaLinhasViewController.h
//  CruzaLinhas
//
//  Created by Guilherme Chapiewski on 9/14/10.
//  Copyright Yahoo! 2010. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <MapKit/MapKit.h>
#import <CoreLocation/CoreLocation.h>

@interface CruzaLinhasViewController : UIViewController <UISearchBarDelegate> {
	IBOutlet MKMapView *mapView;
	IBOutlet UISearchBar *searchBar;
}

@property (nonatomic, retain) IBOutlet MKMapView *mapView;
@property (nonatomic, retain) CLLocationManager *locationManager;

@end

