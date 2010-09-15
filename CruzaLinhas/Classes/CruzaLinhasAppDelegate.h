//
//  CruzaLinhasAppDelegate.h
//  CruzaLinhas
//
//  Created by Guilherme Chapiewski on 9/14/10.
//  Copyright Yahoo! 2010. All rights reserved.
//

#import <UIKit/UIKit.h>

@class CruzaLinhasViewController;

@interface CruzaLinhasAppDelegate : NSObject <UIApplicationDelegate> {
    UIWindow *window;
    CruzaLinhasViewController *viewController;
}

@property (nonatomic, retain) IBOutlet UIWindow *window;
@property (nonatomic, retain) IBOutlet CruzaLinhasViewController *viewController;

@end

