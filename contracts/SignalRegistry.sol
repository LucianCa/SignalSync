// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SignalRegistry {
    struct SignalProvider {
        address providerAddress;
        string name;
        uint256 reputation;
        uint256 totalSignals;
        bool isActive;
        uint256 registrationTime;
    }

    struct Subscription {
        address subscriber;
        address provider;
        uint256 subscriptionTime;
        bool isActive;
    }

    mapping(address => SignalProvider) public providers;
    mapping(address => mapping(address => Subscription)) public subscriptions;
    mapping(address => address[]) public userSubscriptions;

    address[] public allProviders;

    event ProviderRegistered(address indexed provider, string name);
    event ProviderUpdated(address indexed provider, uint256 reputation);
    event UserSubscribed(address indexed user, address indexed provider);
    event UserUnsubscribed(address indexed user, address indexed provider);

    modifier onlyProvider() {
        require(providers[msg.sender].providerAddress == msg.sender, "Not a registered provider");
        _;
    }

    function registerProvider(string memory _name) external {
        require(providers[msg.sender].providerAddress == address(0), "Provider already registered");
        require(bytes(_name).length > 0, "Name cannot be empty");

        providers[msg.sender] = SignalProvider({
            providerAddress: msg.sender,
            name: _name,
            reputation: 50,
            totalSignals: 0,
            isActive: true,
            registrationTime: block.timestamp
        });

        allProviders.push(msg.sender);

        emit ProviderRegistered(msg.sender, _name);
    }

    function updateReputation(uint256 _reputation) external onlyProvider {
        require(_reputation <= 100, "Reputation must be <= 100");
        providers[msg.sender].reputation = _reputation;
        emit ProviderUpdated(msg.sender, _reputation);
    }

    function incrementSignalCount() external onlyProvider {
        providers[msg.sender].totalSignals++;
    }

    function subscribe(address _provider) external {
        require(providers[_provider].providerAddress != address(0), "Provider not registered");
        require(providers[_provider].isActive, "Provider not active");
        require(!subscriptions[msg.sender][_provider].isActive, "Already subscribed");

        subscriptions[msg.sender][_provider] = Subscription({
            subscriber: msg.sender,
            provider: _provider,
            subscriptionTime: block.timestamp,
            isActive: true
        });

        userSubscriptions[msg.sender].push(_provider);

        emit UserSubscribed(msg.sender, _provider);
    }

    function unsubscribe(address _provider) external {
        require(subscriptions[msg.sender][_provider].isActive, "Not subscribed");

        subscriptions[msg.sender][_provider].isActive = false;

        emit UserUnsubscribed(msg.sender, _provider);
    }

    function getProvider(address _provider) external view returns (SignalProvider memory) {
        return providers[_provider];
    }

    function isSubscribed(address _user, address _provider) external view returns (bool) {
        return subscriptions[_user][_provider].isActive;
    }

    function getUserSubscriptions(address _user) external view returns (address[] memory) {
        return userSubscriptions[_user];
    }

    function getAllProviders() external view returns (address[] memory) {
        return allProviders;
    }
}