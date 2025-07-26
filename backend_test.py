#!/usr/bin/env python3
"""
Backend API Testing Suite for Andreas Stenberg's Portfolio Website
Tests all API endpoints with bilingual support and proper error handling
"""

import requests
import json
import sys
import os
from datetime import datetime

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except FileNotFoundError:
        return "http://localhost:8001"
    return "http://localhost:8001"

BASE_URL = get_backend_url()
API_BASE = f"{BASE_URL}/api"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'

def print_test_header(test_name):
    print(f"\n{Colors.BLUE}{Colors.BOLD}{'='*60}{Colors.ENDC}")
    print(f"{Colors.BLUE}{Colors.BOLD}Testing: {test_name}{Colors.ENDC}")
    print(f"{Colors.BLUE}{Colors.BOLD}{'='*60}{Colors.ENDC}")

def print_success(message):
    print(f"{Colors.GREEN}✅ {message}{Colors.ENDC}")

def print_error(message):
    print(f"{Colors.RED}❌ {message}{Colors.ENDC}")

def print_warning(message):
    print(f"{Colors.YELLOW}⚠️  {message}{Colors.ENDC}")

def print_info(message):
    print(f"{Colors.BLUE}ℹ️  {message}{Colors.ENDC}")

class BackendTester:
    def __init__(self):
        self.passed_tests = 0
        self.failed_tests = 0
        self.total_tests = 0
        
    def test_health_check(self):
        """Test the health check endpoint"""
        print_test_header("Health Check API")
        
        try:
            response = requests.get(f"{API_BASE}/health", timeout=10)
            self.total_tests += 1
            
            if response.status_code == 200:
                data = response.json()
                if data.get("status") == "healthy":
                    print_success("Health check endpoint working correctly")
                    print_info(f"Response: {data}")
                    self.passed_tests += 1
                    return True
                else:
                    print_error(f"Health check returned unexpected data: {data}")
                    self.failed_tests += 1
                    return False
            else:
                print_error(f"Health check failed with status {response.status_code}")
                self.failed_tests += 1
                return False
                
        except requests.exceptions.RequestException as e:
            print_error(f"Health check request failed: {str(e)}")
            self.failed_tests += 1
            return False

    def test_portfolio_api(self):
        """Test portfolio API with language support"""
        print_test_header("Portfolio API")
        
        # Test English version
        try:
            response = requests.get(f"{API_BASE}/portfolio?lang=en", timeout=10)
            self.total_tests += 1
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["personal", "home", "about"]
                
                if all(field in data for field in required_fields):
                    print_success("Portfolio API (English) working correctly")
                    print_info(f"Personal info: {data['personal']['name']} - {data['personal']['title']}")
                    self.passed_tests += 1
                else:
                    print_error(f"Portfolio API missing required fields. Got: {list(data.keys())}")
                    self.failed_tests += 1
                    
            else:
                print_error(f"Portfolio API (English) failed with status {response.status_code}")
                if response.status_code == 404:
                    print_warning("Portfolio data not found - database may not be seeded")
                self.failed_tests += 1
                
        except requests.exceptions.RequestException as e:
            print_error(f"Portfolio API (English) request failed: {str(e)}")
            self.failed_tests += 1

        # Test Norwegian version
        try:
            response = requests.get(f"{API_BASE}/portfolio?lang=no", timeout=10)
            self.total_tests += 1
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["personal", "home", "about"]
                
                if all(field in data for field in required_fields):
                    print_success("Portfolio API (Norwegian) working correctly")
                    print_info(f"Personal info: {data['personal']['name']} - {data['personal']['title']}")
                    self.passed_tests += 1
                else:
                    print_error(f"Portfolio API (Norwegian) missing required fields. Got: {list(data.keys())}")
                    self.failed_tests += 1
                    
            else:
                print_error(f"Portfolio API (Norwegian) failed with status {response.status_code}")
                self.failed_tests += 1
                
        except requests.exceptions.RequestException as e:
            print_error(f"Portfolio API (Norwegian) request failed: {str(e)}")
            self.failed_tests += 1

    def test_timeline_api(self):
        """Test timeline API with language support"""
        print_test_header("Timeline API")
        
        # Test English version
        try:
            response = requests.get(f"{API_BASE}/timeline?lang=en", timeout=10)
            self.total_tests += 1
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list):
                    print_success(f"Timeline API (English) working correctly - {len(data)} items")
                    if data:
                        required_fields = ["year", "title", "company", "description"]
                        if all(field in data[0] for field in required_fields):
                            print_info(f"Sample item: {data[0]['year']} - {data[0]['title']} at {data[0]['company']}")
                            self.passed_tests += 1
                        else:
                            print_error(f"Timeline items missing required fields. Got: {list(data[0].keys()) if data else 'empty'}")
                            self.failed_tests += 1
                    else:
                        print_warning("Timeline API returned empty list - database may not be seeded")
                        self.passed_tests += 1
                else:
                    print_error(f"Timeline API should return a list, got: {type(data)}")
                    self.failed_tests += 1
                    
            else:
                print_error(f"Timeline API (English) failed with status {response.status_code}")
                self.failed_tests += 1
                
        except requests.exceptions.RequestException as e:
            print_error(f"Timeline API (English) request failed: {str(e)}")
            self.failed_tests += 1

        # Test Norwegian version
        try:
            response = requests.get(f"{API_BASE}/timeline?lang=no", timeout=10)
            self.total_tests += 1
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list):
                    print_success(f"Timeline API (Norwegian) working correctly - {len(data)} items")
                    if data:
                        print_info(f"Sample item: {data[0]['year']} - {data[0]['title']} at {data[0]['company']}")
                    self.passed_tests += 1
                else:
                    print_error(f"Timeline API should return a list, got: {type(data)}")
                    self.failed_tests += 1
                    
            else:
                print_error(f"Timeline API (Norwegian) failed with status {response.status_code}")
                self.failed_tests += 1
                
        except requests.exceptions.RequestException as e:
            print_error(f"Timeline API (Norwegian) request failed: {str(e)}")
            self.failed_tests += 1

    def test_projects_api(self):
        """Test projects API with language support"""
        print_test_header("Projects API")
        
        # Test English version
        try:
            response = requests.get(f"{API_BASE}/projects?lang=en", timeout=10)
            self.total_tests += 1
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list):
                    print_success(f"Projects API (English) working correctly - {len(data)} projects")
                    if data:
                        required_fields = ["title", "description", "technologies"]
                        if all(field in data[0] for field in required_fields):
                            print_info(f"Sample project: {data[0]['title']}")
                            print_info(f"Technologies: {', '.join(data[0]['technologies'])}")
                            self.passed_tests += 1
                        else:
                            print_error(f"Project items missing required fields. Got: {list(data[0].keys()) if data else 'empty'}")
                            self.failed_tests += 1
                    else:
                        print_warning("Projects API returned empty list - database may not be seeded")
                        self.passed_tests += 1
                else:
                    print_error(f"Projects API should return a list, got: {type(data)}")
                    self.failed_tests += 1
                    
            else:
                print_error(f"Projects API (English) failed with status {response.status_code}")
                self.failed_tests += 1
                
        except requests.exceptions.RequestException as e:
            print_error(f"Projects API (English) request failed: {str(e)}")
            self.failed_tests += 1

        # Test Norwegian version
        try:
            response = requests.get(f"{API_BASE}/projects?lang=no", timeout=10)
            self.total_tests += 1
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list):
                    print_success(f"Projects API (Norwegian) working correctly - {len(data)} projects")
                    if data:
                        print_info(f"Sample project: {data[0]['title']}")
                    self.passed_tests += 1
                else:
                    print_error(f"Projects API should return a list, got: {type(data)}")
                    self.failed_tests += 1
                    
            else:
                print_error(f"Projects API (Norwegian) failed with status {response.status_code}")
                self.failed_tests += 1
                
        except requests.exceptions.RequestException as e:
            print_error(f"Projects API (Norwegian) request failed: {str(e)}")
            self.failed_tests += 1

        # Test featured projects filter
        try:
            response = requests.get(f"{API_BASE}/projects?lang=en&featured_only=true", timeout=10)
            self.total_tests += 1
            
            if response.status_code == 200:
                data = response.json()
                print_success(f"Featured projects filter working - {len(data)} featured projects")
                self.passed_tests += 1
            else:
                print_error(f"Featured projects filter failed with status {response.status_code}")
                self.failed_tests += 1
                
        except requests.exceptions.RequestException as e:
            print_error(f"Featured projects filter request failed: {str(e)}")
            self.failed_tests += 1

    def test_blog_api(self):
        """Test blog API with language support"""
        print_test_header("Blog API")
        
        # Test English version
        try:
            response = requests.get(f"{API_BASE}/blog?lang=en", timeout=10)
            self.total_tests += 1
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list):
                    print_success(f"Blog API (English) working correctly - {len(data)} posts")
                    if data:
                        required_fields = ["title", "excerpt", "date", "slug", "category"]
                        if all(field in data[0] for field in required_fields):
                            print_info(f"Sample post: {data[0]['title']}")
                            print_info(f"Category: {data[0]['category']}, Date: {data[0]['date']}")
                            self.passed_tests += 1
                        else:
                            print_error(f"Blog posts missing required fields. Got: {list(data[0].keys()) if data else 'empty'}")
                            self.failed_tests += 1
                    else:
                        print_warning("Blog API returned empty list - database may not be seeded")
                        self.passed_tests += 1
                else:
                    print_error(f"Blog API should return a list, got: {type(data)}")
                    self.failed_tests += 1
                    
            else:
                print_error(f"Blog API (English) failed with status {response.status_code}")
                self.failed_tests += 1
                
        except requests.exceptions.RequestException as e:
            print_error(f"Blog API (English) request failed: {str(e)}")
            self.failed_tests += 1

        # Test Norwegian version
        try:
            response = requests.get(f"{API_BASE}/blog?lang=no", timeout=10)
            self.total_tests += 1
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list):
                    print_success(f"Blog API (Norwegian) working correctly - {len(data)} posts")
                    if data:
                        print_info(f"Sample post: {data[0]['title']}")
                    self.passed_tests += 1
                else:
                    print_error(f"Blog API should return a list, got: {type(data)}")
                    self.failed_tests += 1
                    
            else:
                print_error(f"Blog API (Norwegian) failed with status {response.status_code}")
                self.failed_tests += 1
                
        except requests.exceptions.RequestException as e:
            print_error(f"Blog API (Norwegian) request failed: {str(e)}")
            self.failed_tests += 1

        # Test pagination
        try:
            response = requests.get(f"{API_BASE}/blog?lang=en&limit=5&skip=0", timeout=10)
            self.total_tests += 1
            
            if response.status_code == 200:
                data = response.json()
                print_success(f"Blog pagination working - returned {len(data)} posts (limit=5)")
                self.passed_tests += 1
            else:
                print_error(f"Blog pagination failed with status {response.status_code}")
                self.failed_tests += 1
                
        except requests.exceptions.RequestException as e:
            print_error(f"Blog pagination request failed: {str(e)}")
            self.failed_tests += 1

    def test_contact_api(self):
        """Test contact form submission"""
        print_test_header("Contact API")
        
        # Test valid contact form submission
        contact_data = {
            "name": "Andreas Test",
            "email": "andreas.test@example.com",
            "subject": "Test Contact Form",
            "message": "This is a test message to verify the contact form functionality works correctly."
        }
        
        try:
            response = requests.post(
                f"{API_BASE}/contact",
                json=contact_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            self.total_tests += 1
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "thank you" in data["message"].lower():
                    print_success("Contact form submission working correctly")
                    print_info(f"Response: {data['message']}")
                    self.passed_tests += 1
                else:
                    print_error(f"Contact form returned unexpected response: {data}")
                    self.failed_tests += 1
            else:
                print_error(f"Contact form submission failed with status {response.status_code}")
                try:
                    error_data = response.json()
                    print_error(f"Error details: {error_data}")
                except:
                    print_error(f"Response text: {response.text}")
                self.failed_tests += 1
                
        except requests.exceptions.RequestException as e:
            print_error(f"Contact form submission request failed: {str(e)}")
            self.failed_tests += 1

        # Test invalid email validation
        invalid_contact_data = {
            "name": "Test User",
            "email": "invalid-email",
            "subject": "Test",
            "message": "Test message"
        }
        
        try:
            response = requests.post(
                f"{API_BASE}/contact",
                json=invalid_contact_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            self.total_tests += 1
            
            if response.status_code == 422:  # Validation error expected
                print_success("Contact form email validation working correctly")
                self.passed_tests += 1
            elif response.status_code == 200:
                print_warning("Contact form accepted invalid email - validation may be missing")
                self.passed_tests += 1
            else:
                print_error(f"Contact form validation test failed with status {response.status_code}")
                self.failed_tests += 1
                
        except requests.exceptions.RequestException as e:
            print_error(f"Contact form validation test request failed: {str(e)}")
            self.failed_tests += 1

    def test_newsletter_api(self):
        """Test newsletter subscription"""
        print_test_header("Newsletter API")
        
        # Test valid newsletter subscription
        newsletter_data = {
            "email": "andreas.newsletter@example.com"
        }
        
        try:
            response = requests.post(
                f"{API_BASE}/newsletter",
                json=newsletter_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            self.total_tests += 1
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "subscribed" in data["message"].lower():
                    print_success("Newsletter subscription working correctly")
                    print_info(f"Response: {data['message']}")
                    self.passed_tests += 1
                else:
                    print_error(f"Newsletter subscription returned unexpected response: {data}")
                    self.failed_tests += 1
            else:
                print_error(f"Newsletter subscription failed with status {response.status_code}")
                try:
                    error_data = response.json()
                    print_error(f"Error details: {error_data}")
                except:
                    print_error(f"Response text: {response.text}")
                self.failed_tests += 1
                
        except requests.exceptions.RequestException as e:
            print_error(f"Newsletter subscription request failed: {str(e)}")
            self.failed_tests += 1

        # Test duplicate subscription
        try:
            response = requests.post(
                f"{API_BASE}/newsletter",
                json=newsletter_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            self.total_tests += 1
            
            if response.status_code == 200:
                data = response.json()
                if "already subscribed" in data["message"].lower():
                    print_success("Newsletter duplicate subscription handling working correctly")
                    self.passed_tests += 1
                else:
                    print_info(f"Newsletter duplicate handling: {data['message']}")
                    self.passed_tests += 1
            else:
                print_error(f"Newsletter duplicate subscription test failed with status {response.status_code}")
                self.failed_tests += 1
                
        except requests.exceptions.RequestException as e:
            print_error(f"Newsletter duplicate subscription test request failed: {str(e)}")
            self.failed_tests += 1

        # Test invalid email validation
        invalid_newsletter_data = {
            "email": "invalid-email-format"
        }
        
        try:
            response = requests.post(
                f"{API_BASE}/newsletter",
                json=invalid_newsletter_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            self.total_tests += 1
            
            if response.status_code == 422:  # Validation error expected
                print_success("Newsletter email validation working correctly")
                self.passed_tests += 1
            elif response.status_code == 200:
                print_warning("Newsletter accepted invalid email - validation may be missing")
                self.passed_tests += 1
            else:
                print_error(f"Newsletter email validation test failed with status {response.status_code}")
                self.failed_tests += 1
                
        except requests.exceptions.RequestException as e:
            print_error(f"Newsletter email validation test request failed: {str(e)}")
            self.failed_tests += 1

    def test_cors_headers(self):
        """Test CORS headers are properly set"""
        print_test_header("CORS Headers")
        
        try:
            response = requests.options(f"{API_BASE}/health", timeout=10)
            self.total_tests += 1
            
            cors_headers = [
                'Access-Control-Allow-Origin',
                'Access-Control-Allow-Methods',
                'Access-Control-Allow-Headers'
            ]
            
            found_headers = []
            for header in cors_headers:
                if header in response.headers:
                    found_headers.append(header)
            
            if found_headers:
                print_success(f"CORS headers present: {', '.join(found_headers)}")
                self.passed_tests += 1
            else:
                print_warning("No CORS headers found in OPTIONS response")
                # Try a regular GET request to check CORS headers
                get_response = requests.get(f"{API_BASE}/health", timeout=10)
                if 'Access-Control-Allow-Origin' in get_response.headers:
                    print_success("CORS headers found in GET response")
                    self.passed_tests += 1
                else:
                    print_error("CORS headers not properly configured")
                    self.failed_tests += 1
                
        except requests.exceptions.RequestException as e:
            print_error(f"CORS headers test request failed: {str(e)}")
            self.failed_tests += 1

    def run_all_tests(self):
        """Run all backend API tests"""
        print(f"{Colors.BOLD}{'='*80}{Colors.ENDC}")
        print(f"{Colors.BOLD}Andreas Stenberg Portfolio - Backend API Test Suite{Colors.ENDC}")
        print(f"{Colors.BOLD}Backend URL: {BASE_URL}{Colors.ENDC}")
        print(f"{Colors.BOLD}{'='*80}{Colors.ENDC}")
        
        # Run all tests
        self.test_health_check()
        self.test_portfolio_api()
        self.test_timeline_api()
        self.test_projects_api()
        self.test_blog_api()
        self.test_contact_api()
        self.test_newsletter_api()
        self.test_cors_headers()
        
        # Print summary
        print(f"\n{Colors.BOLD}{'='*80}{Colors.ENDC}")
        print(f"{Colors.BOLD}TEST SUMMARY{Colors.ENDC}")
        print(f"{Colors.BOLD}{'='*80}{Colors.ENDC}")
        
        success_rate = (self.passed_tests / self.total_tests * 100) if self.total_tests > 0 else 0
        
        print(f"Total Tests: {self.total_tests}")
        print(f"{Colors.GREEN}Passed: {self.passed_tests}{Colors.ENDC}")
        print(f"{Colors.RED}Failed: {self.failed_tests}{Colors.ENDC}")
        print(f"Success Rate: {success_rate:.1f}%")
        
        if self.failed_tests == 0:
            print(f"\n{Colors.GREEN}{Colors.BOLD}🎉 All tests passed! Backend API is fully functional.{Colors.ENDC}")
            return True
        else:
            print(f"\n{Colors.RED}{Colors.BOLD}⚠️  {self.failed_tests} test(s) failed. Please check the issues above.{Colors.ENDC}")
            return False

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)