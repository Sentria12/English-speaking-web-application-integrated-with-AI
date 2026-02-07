package com.aesp.backend.service;

import com.aesp.backend.entity.Subscription;
import java.util.Optional;

public interface SubscriptionService {
    Subscription activateSubscription(Integer userId, Integer packageId);

    boolean isSubscriptionValid(Integer userId);

    Optional<Subscription> getCurrentSubscription(Integer userId);
}