export function useCustomerDetails() {
  const getCustomerCity = (customer) => {
    if (customer.shipping_addresses?.length > 0) {
      const primaryAddress = customer.shipping_addresses.find(addr => addr.is_primary)
      return primaryAddress?.city || customer.shipping_addresses[0].city
    }
    
    return customer.store_locations?.[0]?.city || ''
  }

  const getInitials = (name, name2) => {
    if (!name) return ''
    
    const initials = []
    
    // Get first letter of first word from name
    const firstNameInitial = name.split(' ')[0][0]
    initials.push(firstNameInitial)
    
    // Get first letter of first word from name_2 if it exists
    if (name2) {
      const secondNameInitial = name2.split(' ')[0][0]
      initials.push(secondNameInitial)
    }

    return initials.join('').toUpperCase()
  }

  return {
    getCustomerCity,
    getInitials
  }
} 